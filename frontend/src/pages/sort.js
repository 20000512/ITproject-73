import { Box, Tabs, Tab, Typography } from '@mui/material';
import PageWrapper from '../components/pagewrapper';
import NavBarWrapper from '../components/navbarwrapper';
import Navpagewrapper from '../components/navpagewrapper';
import { useState } from 'react';

const Sort = () => {

  const [data, setData] = useState([{
    id: 1,
    type: 'main',
    list: ['food', 'food', 'food', 'food', 'food', 'food']
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '30px' }}>
        <Box
      sx={{ flexGrow: 1, width: '100%', display: 'flex' }}
    >
        <Tabs
        orientation="vertical"
        variant="scrollable"
        value={active}
        onChange={() => console.log('Active')}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {data.map((e, index) => <Tab key={index} label={e.type} sx={{
          backgroundColor: active.id === e.id ? '#f57c18' : 'transparent'
        }} onClick={() => setActive(e)} />)}
      </Tabs>
      <Box sx={{ display: 'flex'}}>{active.list.map((ele, index) => <Typography sx={{ px: '16px', py: '8px'}} key={index}>{ele}</Typography>)}</Box>
      </Box>
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
}

export default Sort;