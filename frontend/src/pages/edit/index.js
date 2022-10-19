import oneImg from "../../assets/1.jpg";
import avatarImg from "../../assets/avatar.jpg";
import { Box, Typography, Modal, TextField, Stack, Button } from "@mui/material";
import PageWrapper from "../../components/pagewrapper";
import NavBarWrapper from "../../components/navbarwrapper";
import Navpagewrapper from "../../components/navpagewrapper";
import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import React from "react";
import ImageUpload from "../../components/ImageUpload";
import axios from 'axios';

const galleryImageList = [
  "https://raw.githubusercontent.com/dxyang/StyleTransfer/master/style_imgs/mosaic.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dora-maar-picasso.jpg",
  "https://pbs.twimg.com/profile_images/925531519858257920/IyYLHp-u_400x400.jpg",
  "https://raw.githubusercontent.com/ShafeenTejani/fast-style-transfer/master/examples/dog.jpg",
  "http://r.ddmcdn.com/s_f/o_1/cx_462/cy_245/cw_1349/ch_1349/w_720/APL/uploads/2015/06/caturday-shutterstock_149320799.jpg"
];


const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ]
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
]

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // type/id
  const type = searchParams.get('type');
  const id = searchParams.get('id');
  const [cover, setCover] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    const data = JSON.parse(localStorage.getItem('draft'));
    if (data) {
      if (type === 'edit') {
        const index = localStorage.getItem('draftIndex');
        data[index] = {
          cover,
          title,
          description,
          content
        }
      } else {
        data.push({
          cover,
          title,
          description,
          content
        });
      }
      localStorage.setItem('draft', JSON.stringify(data));

    } else {
      localStorage.setItem('draft', JSON.stringify([{
        cover,
        title,
        description,
        content
      }]));
    }
    localStorage.getItem('draft'.cover)
    navigate('/profile');
  }
  
  const handleClick = () => {
    const recipe = {
      title:title,
      description:description,
      cover:localStorage.getItem("image"),
      content:content,
      state:"published"
      }
    axios.post('http://localhost:5003/recipes/add',recipe,{
      headers: {
        'authorization': 'Bearer ' + localStorage.getItem("username") //the token is a variable which holds the token
      }})
    .then(res => {
      console.log(res.data)
      navigate('/')
      })
    .catch((error) => { console.error(error) });//login or password worng
  };
  const handleEdit = (content, delta, source, editor) => {
    setContent(editor.getHTML())
  }

  useEffect(() => {
    if (type === 'edit') {
      const index = localStorage.getItem('draftIndex');
      const data = JSON.parse(localStorage.getItem('draft'));
      if (data) {
        setCover(data[+index].cover);
        setTitle(data[+index].title);
        setDescription(data[+index].description);
        setContent(data[+index].content);
      }
    }
  }, []);


  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box sx={{ width: '100%', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <ArrowBackIosIcon
            sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant='h5'>{type ? 'New Post' : 'Edit'}</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form noValidate autoComplete="off">
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              margin: 'auto',
              width: '1000px'
            }}>
              <Box sx={{
                display: 'flex', justifyContent: 'center', marginTop: '20px'
              }}>
                <TextField
                  sx={{ width: '100%' }}
                  id="outlined-name"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </Box>
              
              <Box sx={{
                display: 'flex', justifyContent: 'start', marginTop: '20px'
              }}>
              <ImageUpload cardName="Input Image" imageGallery={galleryImageList} />
              </Box>
    


              <Box sx={{
                display: 'flex', justifyContent: 'center', marginTop: '20px'
              }}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Description"
                  multiline
                  rows={4}
                  variant="filled"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>

              <Box sx={{
                display: 'flex', justifyContent: 'center', marginTop: '20px', paddingBottom: "80px"
              }}>
                <TextField
                  sx={{ width: '100%' }}
                  label="Content"
                  multiline
                  rows={15}
                  variant="filled"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Box>
            </Box>
          </form>
        </Box>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              onClick={handleClick}
              label="Publish"
              icon={<SaveIcon />}
            />
            <BottomNavigationAction
              onClick={handleSave}
              label="Save as Draft"
              icon={<SaveAsIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Navpagewrapper>
    </PageWrapper>
  );
};


export default Edit;
