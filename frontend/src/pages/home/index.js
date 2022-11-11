import oneImg from "../../assets/1.jpg";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import PageWrapper from "../../components/pagewrapper";
import NavBarWrapper from "../../components/navbarwrapper";
import Navpagewrapper from "../../components/navpagewrapper";
import ItemCard from "../../components/itemcard";
import toast from "react-hot-toast";
import axios from "axios";
import { host } from "../host";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [resultArray, setResultArray] = useState([]);

  useEffect(() => {
    const expensesListResp = async () => {
      await axios
        .get(host + "/recipes/hot")
        .then((response) => setResultArray(response.data))
        .catch(() => toast.error("An unknown error occurred"));
    };
    expensesListResp();
  }, []);
  const arrayLength = resultArray.data?.length;

  var postData = [];
  for (var i = 0; i < arrayLength; i++) {
    postData[i] = {
      id: resultArray.data?.[i]._id,
      cover: resultArray.data?.[i].cover,
      title: resultArray.data?.[i].title,
      description: resultArray.data?.[i].description,
    };
  }

  const data = postData;

  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box
          sx={{
            width: "100%",
            height: "64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Hottest Recipe</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "30px",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1000px" }}>
            {data.map((e) => (
              <ItemCard
                onClick={() => navigate("/detail/" + e.id)}
                sx={{ mb: "30px" }}
                key={e.id}
                title={e.title}
                cover={e.cover}
                description={e.description}
              />
            ))}
          </Box>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
};

export default Home;
