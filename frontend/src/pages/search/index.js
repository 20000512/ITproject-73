import oneImg from '../../assets/1.jpg';
import { Box, Grid, Typography } from '@mui/material';
import PageWrapper from '../../components/pagewrapper';
import NavBarWrapper from '../../components/navbarwrapper';
import Navpagewrapper from '../../components/navpagewrapper';
import ItemCard from '../../components/itemcard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import {host} from '../host';
const Search = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  // Store search keyword
  const [keywords, setKeywords] = useState('');
  const [data, setData] = useState([]);

  // Search by typing keywords and press search button
  const handleSearch = () => {
    setList(Array.from(new Set([keywords, ...list])));
    setShow(true);
  };

  // Search by clicking keywords in search history
  const handleResearch = (e) => {
    setKeywords(e);
    handleSearch();
  };

  //mounted and update when keywords has been inputed 
  useEffect(() => {
    const expensesListResp = async () => {
      await axios.get(host + '/recipes/search/' + keywords)
      .then(response => {
        setData(response.data.data)
        console.log(data)
      })
    } 
    expensesListResp();
  }, [keywords]);

  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box sx={{ width: '100%', height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {show ? <ArrowBackIosIcon
            sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
            onClick={() => setShow(false)}
          /> : ''}
          <Typography variant='h5'>Search {show ? '/' + keywords : ''}</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: '30px' }}>
          {show ? <Box sx={{ width: '100%', maxWidth: '1000px' }}>
            {data.map(e => <ItemCard
              onClick={() => navigate('/detail/' + e._id)}
              sx={{ mb: '30px' }}
              key={e._id}
              title={e.title}
              cover={e.cover}
              description={e.description}
            />)}
          </Box> : <Box>
            <Box>
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '80vw' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={e => setKeywords(e.target.value)}
                />
                <IconButton color="warning" type="button" sx={{ p: '10px', background: '#f57c18', color: 'white', '&:hover': { color: 'black' } }} aria-label="search" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Box>
            <Box sx={{ mt: '30px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Typography Typography variant='h5'>History</Typography>
                <DeleteOutlineIcon sx={{ cursor: 'pointer' }} onClick={() => setList([])} />
              </Box>

              {list.length > 0 ?
              <Grid sx={{ mt: '20px' }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {list.map((e, index) => <Grid sx={{ cursor: 'pointer' }} onClick={() => handleResearch(e)} key={index} item xs={6}>
                  <Typography>{e}</Typography>
                </Grid>)}
              </Grid>
              : <Typography sx={{ mt: '20px', textAlign: 'center' }}>There are no search history~</Typography>}
            </Box>
          </Box>}
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
}

export default Search;