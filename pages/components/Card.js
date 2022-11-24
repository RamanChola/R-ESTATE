import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ImgMediaCard({ props }) {
  const data = { props }.props.data;
  return (
    <Card style={{ margin: 20 }} sx={{ maxWidth: 320, minWidth: 320 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://media-exp1.licdn.com/dms/image/C5603AQF3Uhobos7oOA/profile-displayphoto-shrink_800_800/0/1641667717293?e=1674086400&v=beta&t=KMP_0Xlbkcr2ZDAC0D-Qv9OFuHF4HtdN13k8ot4HprE"
      />
      <CardContent style={{minHeight: "150px"}}>
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.content}
        </Typography>
      </CardContent>
      <CardActions>
        <p style={{ margin: "3px", fontWeight: "bold" }}>{data.price}</p>
        <Link style={{ marginLeft: "auto", color:"black", fontWeight:"bold" }} size="small" href='/folio/Know'>
          Know more
        </Link>
      </CardActions>
    </Card>
  );
}
