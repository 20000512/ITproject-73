import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import { useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../components/pagewrapper';
import toast from 'react-hot-toast';

const Forget = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [send, setSend] = useState(false);

  const handleClick = () => {
    if (!username) return toast.error('Email is required.');
    setSend(true);
  };
  return (
    <PageWrapper>
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {send ? <Box>
          <Typography variant='h3'>√ Check your email</Typography>
          <Typography sx={{ marginTop: '30px', textAlign: 'center' }}>
           We have already sent a password recover instructions to your email.
          </Typography>
          <Typography sx={{ marginTop: '20px', textAlign: 'center' }}>
            Please check it later.
          </Typography>
        </Box> :
        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', maxWidth: '600px' }}>
          <Typography variant='h3'>Forget Your Password ?</Typography>
          <Typography variant='body' sx={{ marginTop: '30px', textAlign: 'center' }}>
            Enter the email associoted with your account and well send an email with instructions to reset your password.
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleClick}>
            <Box sx={{
              display: 'flex', justifyContent: 'center', marginTop: '20px', flexDirection: 'column', alignItems: 'center'
            }}>
              <TextField
                sx={{ width: '400px' }}
                id="outlined-name"
                label="Emial address"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            <Button onClick={() => handleClick()} sx={{ marginTop: '30px', background: '#ffa65c', color: 'black' }} variant="outlined" color="warning">
              {"Reset password"}
            </Button>
            </Box>
          </form>
        </Box>
}
      </Box>
    </PageWrapper>
  );
}

export default Forget;