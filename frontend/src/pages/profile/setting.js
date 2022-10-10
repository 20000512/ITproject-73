import oneImg from '../../assets/1.jpg';
import { Box, Typography } from '@mui/material';
import PageWrapper from '../../components/pagewrapper';
import NavBarWrapper from '../../components/navbarwrapper';
import Navpagewrapper from '../../components/navpagewrapper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

const Setting = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([{
    id: 1,
    cover: oneImg,
    title: 'Food Title Food Title Food Title',
    description: 'Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description',
  }, {
    id: 2,
    cover: oneImg,
    title: 'Food Title Food Title Food Title',
    description: 'Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description',
  }, {
    id: 3,
    cover: oneImg,
    title: 'Food Title Food Title Food Title',
    description: 'Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description Food description',
  }])

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [keywords, setKeywords] = useState('');

  const handleSearch = () => {
    setList(Array.from(new Set([keywords, ...list])));
    setShow(true);
  }

  const handleResearch = (e) => {
    setKeywords(e);
    handleSearch();
  }

  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box sx={{ width: '100%', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <ArrowBackIosIcon
            sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant='h5'>Setting</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '30px' }}>
          <Box onClick={() => navigate('/personal')}  sx={{height: '56px',cursor: 'pointer', borderBottom: '1px solid #787878', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Personal details <ArrowForwardIosOutlinedIcon/></Box>
          <Box onClick={() => navigate('/changepassword')}  sx={{height: '56px',cursor: 'pointer', borderBottom: '1px solid #787878',width: '100%',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Change password <ArrowForwardIosOutlinedIcon/></Box>
          <Box onClick={() => {localStorage.removeItem('username');navigate('/login')}}  sx={{height: '56px',cursor: 'pointer', borderBottom: '1px solid #787878',width: '100%',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Log out <ArrowForwardIosOutlinedIcon/></Box>
          <Box onClick={() => {localStorage.removeItem('username');navigate('/login')}}  sx={{height: '56px',cursor: 'pointer', borderBottom: '1px solid #787878',width: '100%',display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Deleta acoount <ArrowForwardIosOutlinedIcon /></Box>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
}

export default Setting;