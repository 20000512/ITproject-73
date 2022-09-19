import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/pagewrapper';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Navpagewrapper from '../../components/navpagewrapper';
import NavBarWrapper from '../../components/navbarwrapper';
import avatarImg from "../../assets/avatar.jpg";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('xxx@xx.com');
  const [gender, setGender] = useState('male');
  const [family, setFamily] = useState('XXXX');
  const [given, setGiven] = useState('XXXX');
  const [username, setUsername] = useState('Sum');

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
                <img src={avatarImg} alt="" style={{ width: "140px", height: "140px", borderRadius: "50%" }} />
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>
            </Box>
          </form>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
}

export default ChangePassword;