import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { useState } from 'react';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/pagewrapper';
import toast from 'react-hot-toast';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Navpagewrapper from '../../components/navpagewrapper';
import NavBarWrapper from '../../components/navbarwrapper';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const ChangePassword = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [status, setStatus] = useState(false);

  const handleClick = () => {
    if (!username) return toast.error('Email cannot be blank');
    if (!password) return toast.error('Password cannot be blank');
    if (!repassword) return toast.error('RePassword cannot be blank');
    if(repassword !== password) return toast.error('RePassword is not the same as the password');
    setStatus(true);
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };
  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box sx={{ width: '100%', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <ArrowBackIosIcon
            sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant='h5'>Change Password</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        {status ? <Box sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Typography sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }} variant='h5'><LockOutlinedIcon style={{ marginBottom:'20px',fontSize: '36px'}} />Change Password Successful !</Typography>
        <Typography sx={{ mt: '16px' }}>
          Your password has been changed successfully. Please enter your new password to login with your new password.
        </Typography>
        </Box> :
        <Box sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <form noValidate autoComplete="off" onSubmit={handleClick}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <Box sx={{
                display: 'flex', justifyContent: 'center'
              }}>
                <TextField
                  sx={{ width: '400px' }}
                  id="outlined-password-input"
                  label="Current Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center',
              }}>
                <TextField
                  sx={{ width: '400px' }}
                  id="outlined-password-input"
                  label="New Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex', justifyContent: 'center',
              }}>
                <TextField
                  sx={{ width: '400px' }}
                  id="outlined-password-input"
                  label="Confirm Password"
                  type="password"
                  autoComplete="current-password"
                  margin="normal"
                  variant="outlined"
                  value={repassword}
                  onChange={(e) => setRepassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button onClick={() => handleClick()} sx={{ marginTop: '30px', background: '#ffa65c', color: 'white' }} variant="outlined" color="warning">
                Change Password
              </Button>
            </Box>
          </form>
        </Box>}
      </Navpagewrapper>
    </PageWrapper>
  );
}

export default ChangePassword;