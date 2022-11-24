//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract REstate is ERC721URIStorage {
    address payable owner;

    using Counters for Counters.Counter;
    Counters.Counter private _propertyIds;
    Counters.Counter private _propertySold;

    uint256 listPrice = 0.0000001 ether;

    constructor() ERC721("R-Estate", "RST") {
        owner = payable(msg.sender);
    }

    struct ListedProperty {
        uint tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
        string name;
        string description;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    mapping(uint256 => ListedProperty) private idToListedProperty;

    function updateListPrice(uint256 _listPrice) external payable onlyOwner{
        listPrice = _listPrice;
    }

    function getListPrice() external view returns (uint256){
        return listPrice;
    }

    function getLatestIdToListedProperty() public view returns (ListedProperty memory){
        uint256 currentTokenId = _propertyIds.current();
        return idToListedProperty[currentTokenId];
    } 

    function getListedForTokenId(uint256 tokenId) public view returns (ListedProperty memory){
        return idToListedProperty[tokenId];
    } 

    function getCurrentTokenId() public view returns (uint256){
        return _propertyIds.current();
    }

    function createToken(string memory tokenURI, uint256 price, string memory desc, string memory _name) public payable returns(uint){
        require(msg.value >= listPrice, "Send enough ether to list");
        require(price > 0, "Make sure the price ins't negative");

        _propertyIds.increment();
        uint256 currentTokenId = _propertyIds.current();
        _safeMint(msg.sender, currentTokenId);

        _setTokenURI(currentTokenId, tokenURI);

        createListedProperty(currentTokenId, price, _name, desc);

        return currentTokenId;
    }

    function createListedProperty(uint256 tokenId, uint256 price, string memory _name, string memory desc) private{
        idToListedProperty[tokenId] = ListedProperty(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true,
            _name,
            desc
        );

       _transfer(msg.sender, address(this), tokenId);
    }

    function getAllPropertys() public view returns(ListedProperty[] memory){
        uint nftCount = _propertyIds.current();
        ListedProperty[] memory tokens= new ListedProperty[](nftCount);

        uint currentIndex = 0;
        for(uint i = 0; i < nftCount; i++){
            uint currentId = i + 1;
            ListedProperty storage currentItem = idToListedProperty[currentId];
            tokens[currentIndex] = currentItem;
            currentIndex += 1;
        }

        return tokens;
    }

    function getMyPropertys() public view returns(ListedProperty[] memory){
        uint totalItemCount = _propertyIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        // for getting the count of NFTs that belong to the user
        for(uint i = 0; i < totalItemCount; i++){
            if(idToListedProperty[i+1].owner == msg.sender || idToListedProperty[i+1].seller == msg.sender){
                itemCount += 1;
            }
        }
        ListedProperty[] memory items = new ListedProperty[](itemCount);
        for(uint i = 0; i < totalItemCount; i++){
            if(idToListedProperty[i+1].owner == msg.sender || idToListedProperty[i+1].seller == msg.sender){
                uint currentId = i + 1;
                ListedProperty storage currentItem = idToListedProperty[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable{
        uint price = idToListedProperty[tokenId].price;
        require(msg.value == price, "Please submit the asking price for the NFT in order to purchase");

        address seller = idToListedProperty[tokenId].seller;

        idToListedProperty[tokenId].currentlyListed = true;
        idToListedProperty[tokenId].seller = payable(msg.sender);
        _propertySold.increment();

        _transfer(address(this), msg.sender, tokenId);

        approve(address(this), tokenId);

        payable(owner).transfer(listPrice);
        payable(seller).transfer(msg.value);
    }

}
