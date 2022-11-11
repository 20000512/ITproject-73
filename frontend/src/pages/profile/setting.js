import oneImg from "../../assets/1.jpg";
import { Box, Typography } from "@mui/material";
import PageWrapper from "../../components/pagewrapper";
import NavBarWrapper from "../../components/navbarwrapper";
import Navpagewrapper from "../../components/navpagewrapper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import toast from "react-hot-toast";
import axios from "axios";
import { host } from "../host";
const Setting = () => {
  const navigate = useNavigate();

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
            position: "relative",
          }}
        >
          <ArrowBackIosIcon
            sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant="h5">Setting</Typography>
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
          <Box
            onClick={() => navigate("/personal")}
            sx={{
              height: "56px",
              cursor: "pointer",
              borderBottom: "1px solid #787878",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Personal details <ArrowForwardIosOutlinedIcon />
          </Box>
          <Box
            onClick={() => navigate("/changepassword")}
            sx={{
              height: "56px",
              cursor: "pointer",
              borderBottom: "1px solid #787878",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Change password <ArrowForwardIosOutlinedIcon />
          </Box>
          <Box
            onClick={() => {
              localStorage.removeItem("username");
              navigate("/login");
            }}
            sx={{
              height: "56px",
              cursor: "pointer",
              borderBottom: "1px solid #787878",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Log out <ArrowForwardIosOutlinedIcon />
          </Box>
          <Box
            onClick={() => {
              axios
                .put(
                  host + "/users/delete",
                  {},
                  {
                    headers: {
                      authorization:
                        "Bearer " + localStorage.getItem("username"), //the token is a variable which holds the token
                    },
                  }
                )
                .then((res) => {
                  // Account deleted
                  toast.success("Account deleted");
                  localStorage.removeItem("username");
                  navigate("/login");
                })
                .catch((err) => {
                  switch (err.response.status) {
                    case 401:
                      // Authorization error
                      toast.error("You're not logged in! Please login again");
                      localStorage.removeItem("username");
                      navigate("/login");
                      break;
                    default:
                      // Unknown error
                      toast.error("An unknown error occurred");
                  }
                });
            }}
            sx={{
              height: "56px",
              cursor: "pointer",
              borderBottom: "1px solid #787878",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Delete acoount <ArrowForwardIosOutlinedIcon />
          </Box>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
};

export default Setting;
