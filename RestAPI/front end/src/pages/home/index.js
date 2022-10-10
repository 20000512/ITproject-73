import oneImg from '../../assets/1.jpg';
import { Box, Button, TextField, Typography, InputAdornment } from '@mui/material';
import PageWrapper from '../../components/pagewrapper';
import NavBarWrapper from '../../components/navbarwrapper';
import Navpagewrapper from '../../components/navpagewrapper';
import ItemCard from '../../components/itemcard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
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
  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box sx={{ width:'100%', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5'>Hottest Recipe</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '30px' }}>
          <Box sx={{ width: '100%', maxWidth: '1000px' }}>
            {data.map(e => <ItemCard
              onClick={() => navigate('/detail/' + e.id)}
              sx={{ mb: '30px'}}
              key={e.id}
              title={e.title}
              cover={e.cover}
              description={e.description}
            />)}
          </Box>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
}

export default Home;