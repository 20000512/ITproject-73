import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { host } from "../pages/host";
import { useState, useEffect } from "react";

const CardWithDelete = (props) => {
  const [posted, setPosted] = useState([]);

  const handleClick =
    (() => {
      console.log("inside button");
      const expensesListResp = async () => {
        await axios
          .delete(host + "/recipes/", {
            headers: {
              authorization: "Bearer " + localStorage.getItem("username"),
            },
          })
          .then((response) => setPosted(response.data.data));
      };
      expensesListResp();
    },
    []);

  return (
    <Card sx={{ width: "100%" }} {...props}>
      <CardMedia
        component="img"
        height="260"
        image={props.cover}
        alt=""
      ></CardMedia>
      <CardContent sx={{ background: "#fabe51", p: "36px" }}>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={(e) => handleClick(e, "clicked")}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardWithDelete;
