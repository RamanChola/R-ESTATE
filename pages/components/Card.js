import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgMediaCard({ props }) {
  console.log(props);
  return (
    <Card style={{ margin: 20 }} sx={{ maxWidth: 320, minWidth: 320 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://media-exp1.licdn.com/dms/image/C5603AQF3Uhobos7oOA/profile-displayphoto-shrink_800_800/0/1641667717293?e=1674086400&v=beta&t=KMP_0Xlbkcr2ZDAC0D-Qv9OFuHF4HtdN13k8ot4HprE"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.e.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.e.content}
        </Typography>
      </CardContent>
      <CardActions>
        <p style={{ margin: "3px", fontWeight: "bold" }}>{props.e.price}</p>
        <Button style={{ marginLeft: "auto" }} size="small">
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
