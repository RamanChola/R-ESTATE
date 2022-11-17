import { useRouter } from "next/router";

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    textDecoration: "none",
    fontSize: "1.1rem",
    color: router.asPath === href ? "black" : "inherit",
    fontWeight: router.asPath === href ? "bold" : "200",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}

export default ActiveLink;
