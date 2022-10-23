import { Box, Tabs, Tab, Typography } from '@mui/material';
import PageWrapper from '../components/pagewrapper';
import NavBarWrapper from '../components/navbarwrapper';
import Navpagewrapper from '../components/navpagewrapper';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Category= () => {
  const navigate = useNavigate();
  const [data, setData] = useState([{
    id: 1,
    type: 'main',
    list: ['main', 'food', 'food', 'food', 'food', 'food']
  }, {
    id: 2,
    type: 'other',
    list: ['other', 'other', 'other food', 'other food']
  }, {
    id: 3,
    type: 'food',
    list: ['food food', 'food food', 'food food', 'food food']
  }])

  const [active, setActive] = useState(data[0]);
  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box sx={{ width:'100%', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant='h5'>Category</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>

      </Navpagewrapper>
    </PageWrapper>
  );
}

export default Category;