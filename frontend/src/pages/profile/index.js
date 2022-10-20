import oneImg from "../../assets/1.jpg";
import avatarImg from "../../assets/avatar.jpg";
import {
  Box,
  Typography,
} from "@mui/material";
import PageWrapper from "../../components/pagewrapper";
import NavBarWrapper from "../../components/navbarwrapper";
import Navpagewrapper from "../../components/navpagewrapper";
import ItemCard from "../../components/itemcard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import RuleFolderOutlinedIcon from '@mui/icons-material/RuleFolderOutlined';
import axios from 'axios';
import React, { useRef } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
  
  const navigate = useNavigate();
  
  const [resultArray, setResultArray] = useState([]);
  const [resultArraydraft, setResultArraydraft] = useState([]);
  const [resultArraylikes, setResultArraylikes] = useState([]);
  const [resultuser, setuser] = useState([]);
  useEffect(() => {
      const expensesListResp = async () => {
        await axios.get('/users/post',{headers: {
          'authorization': 'Bearer ' + localStorage.getItem("username") //the token is a variable which holds the token
        }})
        .then(
          response => setResultArray(response.data))
      }
      expensesListResp();
    }, []);
  const arrayLength = (resultArray.data?.length)
  useEffect(() => {
    const expensesListRespdraft = async () => {
      await axios.get('/users/draft',{headers: {
        'authorization': 'Bearer ' + localStorage.getItem("username") //the token is a variable which holds the token
      }})
      .then(
        response => setResultArraydraft(response.data))
    }
    expensesListRespdraft();
  }, []);

  console.log(resultArraydraft);
  const arrayLengthdraft = (resultArraydraft.data?.length)
  console.log(arrayLengthdraft); //2

  useEffect(() => {
    const expensesuser = async () => {
      await axios.get('/users/profile',{headers: {
        'authorization': 'Bearer ' + localStorage.getItem("username") //the token is a variable which holds the token
      }})
      .then(
        response => setuser(response.data))
    }
    expensesuser();
  }, []);

  
  useEffect(() => {
    const expensesListResplikes = async () => {
      await axios.get('/users/like',{headers: {
        'authorization': 'Bearer ' + localStorage.getItem("username") //the token is a variable which holds the token
      }})
      .then(
        response => setResultArraylikes(response.data))
    }
    expensesListResplikes();
  }, []);
  console.log(resultArraylikes);
  const arrayLengthlikes = (resultArraydraft.data?.length)
  console.log(arrayLengthlikes); //3
  var postData = [];
  for (var i = 0; i < arrayLength; i++){
    postData[i] = ({
      id: resultArray.data?.[i]._id,
      cover: resultArray.data?.[i].cover,
      title: resultArray.data?.[i].title,
      description: resultArray.data?.[i].description,
    })
  }
  
  const data = postData;
  console.log(data);

  
  const [draft, setDraft] = useState([]);
  const [like, setLike] = useState([]);
  
  const [tab, setTab] = useState(1);

  const handleDraft = (e, index) => {
    localStorage.setItem('draftIndex', index);
    navigate('/edit?type=edit')
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('draft'));
    if (data && data.length) {
      setDraft(data);
    }
  }, []);

  const [avatar, setAvatar] = useState(avatarImg);
  const handleChooseImg = (e) => {
    e.preventDefault();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.jpg, .jpeg, .png';
    input.click();
    input.onchange = async () => {
      try {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setAvatar(reader.result.toString() || '')
        });
        reader.readAsDataURL(input.files[0]);
      } catch (error) {
        toast.error('Upload error');
      }
    };
  }

  const renderItem = () => {
    switch (tab) {
      case 1:
        return data.length ? data.map((e) => (
          <ItemCard
            onClick={() => navigate("/detail/" + e.id)}
            sx={{ mb: "30px" }}
            key={e.id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        )) : <Typography sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: tab === 1 ? "black" : "#787878",
        }}><RuleFolderOutlinedIcon />There are no posted here .</Typography>;
      case 2:
        return draft.length ? draft.map((e, index) => (
          <ItemCard
            onClick={() => handleDraft(e, index)}
            sx={{ mb: "30px" }}
            key={e.id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        )) : <Typography sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: tab === 1 ? "black" : "#787878",
        }}><RuleFolderOutlinedIcon />There are no draft here .</Typography>;
      case 3:
        return like.length > 0 ? like.map((e) => (
          <ItemCard
            onClick={() => navigate("/detail/" + e.id)}
            sx={{ mb: "30px" }}
            key={e.id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        )): <Typography sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: tab === 1 ? "black" : "#787878",
        }}><RuleFolderOutlinedIcon />There are no likes here .</Typography>;
      default:
        return data.map((e) => (
          <ItemCard
            onClick={() => navigate("/detail/" + e.id)}
            sx={{ mb: "30px" }}
            key={e.id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        ));
    }
  };
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
          <Typography variant="h5">Profile</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "30px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <img onClick={handleChooseImg} src={avatar} alt="" style={{ width: "140px", height: "140px", borderRadius: "50%" }} />
              <Typography sx={{ ml: "24px" }} variant="h4">
                Sam
              </Typography>
            </Box>
            <SettingsOutlinedIcon
              onClick={() => navigate('/setting')}
              style={{ fontSize: "32px", cursor: "pointer" }}
            />
          </Box>
          <Box
            sx={{
              my: "30px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: tab === 1 ? "black" : "#787878",
              }}
              onClick={() => setTab(1)}
            >
              <PostAddOutlinedIcon />
              Posted
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: tab === 2 ? "black" : "#787878",
              }}
              onClick={() => setTab(2)}
            >
              <SaveAsOutlinedIcon />
              Draft
            </Typography>
            <Typography
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: tab === 3 ? "black" : "#787878",
              }}
              onClick={() => setTab(3)}
            >
              <FavoriteBorderIcon />
              Likes
            </Typography>
          </Box>
          <Box sx={{ width: "100%", maxWidth: "1000px" }}>
            {renderItem()}
          </Box>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
};

export default Profile;
