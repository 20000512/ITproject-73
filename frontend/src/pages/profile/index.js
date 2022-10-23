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
import {host} from '../host';

const Profile = () => {
  const navigate = useNavigate();
  
  // Store user posted recipes
  const [posted, setPosted] = useState([]);
  // Store user drafted recipes
  const [draft, setDraft] = useState([]);
  // Store user liked recipes
  const [likes, setLikes] = useState([]);
  // Store user username and profile image
  const [user, setUser] = useState([]);
  // Store state of the profile page: On posted, draft or likes page
  const [tab, setTab] = useState(1);

  // Fetch and store user posted recipes
  useEffect(() => {
    const expensesListResp = async () => {
      await axios.get(host + '/users/post',{
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem("username") 
        }
      })
        .then(response => setPosted(response.data.data))
    }
    expensesListResp();
  }, []);

  // Fetch and store user drafted recipes
  useEffect(() => {
    const expensesListRespdraft = async () => {
      await axios.get(host + '/users/draft', {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem("username")
        }
      })
        .then(response => setDraft(response.data.data))
    }
    expensesListRespdraft();
  }, []);

  // Fetch and store user liked recipes
  useEffect(() => {
    const expensesListResplikes = async () => {
      await axios.get(host + '/users/like', {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem("username")
        }
      })
        .then(response => setLikes(response.data.data))
    }
    expensesListResplikes();
  }, []);

  // Fetch and store user username and profile image
  useEffect(() => {
    const expensesuser = async () => {
      await axios.get(host + '/users/profile', {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem("username")
        }
      })
        .then(response => setUser(response.data.data))
    }
    expensesuser();
  }, []);
  
  // Handle draft recipe click: Store recipe content and navigate to edit page
  const handleDraft = (e) => {
    // Store JSON string of recipe in localStorage
    localStorage.setItem('tempDraft', JSON.stringify(e));
    navigate('/edit?type=edit');
  }

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

  // Render posted/draft/likes recipes based on the current page
  const renderItem = () => {
    switch (tab) {
      // Render posted recipes
      case 1:
        return posted.length ? posted.map((e) => (
          <ItemCard
            onClick={() => navigate("/detail/" + e._id)}
            sx={{ mb: "30px" }}
            key={e._id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        )) : 
        // Default response if user don't have any posted recipes
        <Typography sx={
          {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: tab === 1 ? "black" : "#787878",
          }
        }>
          <RuleFolderOutlinedIcon />There are no posted here.
        </Typography>;
      // Render draft recipes
      case 2:
        return draft.length ? draft.map((e, index) => (
          <ItemCard
            onClick={() => handleDraft(e, index)}
            sx={{ mb: "30px" }}
            key={e._id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        )) : 
        // Default response if user don't have any draft recipes
        <Typography sx={
          {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: tab === 1 ? "black" : "#787878",
          }
        }>
          <RuleFolderOutlinedIcon />There are no draft here.
        </Typography>;
      // Render liked recipes
      case 3:
        return likes.length ? likes.map((e) => (
          <ItemCard
            onClick={() => navigate("/detail/" + e._id)}
            sx={{ mb: "30px" }}
            key={e._id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        )) : 
        // Default response if user don't have any liked recipes
        <Typography sx={
          {
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: tab === 1 ? "black" : "#787878",
          }
        }>
          <RuleFolderOutlinedIcon />There are no likes here.
        </Typography>;
      default:
        // Default case, render posted recipes
        return posted.map((e) => (
          <ItemCard
            onClick={() => navigate("/detail/" + e._id)}
            sx={{ mb: "30px" }}
            key={e._id}
            title={e.title}
            cover={e.cover}
            description={e.description}
          />
        ));
    }
  };

  // Return formatting of the profile page
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
