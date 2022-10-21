import { Box, TextField, Typography, Button, imageListClasses } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/pagewrapper';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Navpagewrapper from '../../components/navpagewrapper';
import NavBarWrapper from '../../components/navbarwrapper';
import avatarImg from "../../assets/avatar.jpg";
import toast from 'react-hot-toast';
const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [family, setFamily] = useState('');
  const [given, setGiven] = useState('');
  const [username, setUsername] = useState('Sum');
  const [avatar, setAvatar] = useState(avatarImg);
  const handleClick = () => {
    if (!username) return toast.error('Email cannot be blank');
    toast.success('Username changed');
  };
  
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
          const url = reader.result
          localStorage.setItem("image",url);
        });
        reader.readAsDataURL(input.files[0]);
      } catch (error) {
        toast.error('Upload error');
      }
    };
  }

  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box sx={{ width: '100%', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <ArrowBackIosIcon
            sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant='h5'>Personal Details</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          mt: '30px',
          alignItems: 'center'
        }}>
          <form noValidate autoComplete="off">
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: 'calc(100vw - 64px)',
              justifyContent: 'flex-start',
              maxWidth: '800px',
            }}>
              <Box sx={{
              display: 'flex',
            }}>
                <img onClick={handleChooseImg} src={avatar} alt="" style={{ width: "140px", height: "140px", borderRadius: "50%" }} />
                <Box sx={{
                display: 'flex', justifyContent: 'center', width: '100%', ml: '30px', mt: '20px'
              }}>
                <TextField
                  sx={{ width: '100%'}}
                  id="outlined-password-input"
                  label="username"
                  type="text"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>
              </Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center', width: '100%',  mt: '20px'
              }}>
                <TextField
                  sx={{ width: '100%'}}
                  id="outlined-password-input"
                  label="Given Name"
                  type="text"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={given}
                  disabled
                  onChange={(e) => setGiven(e.target.value)}
                />
              </Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center', width: '100%',  mt: '20px'
              }}>
                <TextField
                  sx={{ width: '100%'}}
                  id="outlined-password-input"
                  label="Family Name"
                  type="text"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={family}
                  disabled
                  onChange={(e) => setFamily(e.target.value)}
                />
              </Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center', width: '100%',  mt: '20px'
              }}>
                <TextField
                  sx={{ width: '100%'}}
                  id="outlined-password-input"
                  label="Gender"
                  type="text"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={gender}
                  disabled
                  onChange={(e) => setGender(e.target.value)}
                />
              </Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center', width: '100%',  mt: '20px'
              }}>
                <TextField
                  sx={{ width: '100%'}}
                  id="outlined-password-input"
                  label="Email Address"
                  type="text"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  disabled
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
              <Button onClick={() => handleClick()} sx={{ marginTop: '30px', background: '#ffa65c', color: 'white' }} variant="outlined" color="warning">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
}

export default ChangePassword;