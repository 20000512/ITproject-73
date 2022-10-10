// material-ui
import { styled } from '@mui/material/styles';

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const PageWrapper = styled('div')(({ theme }) => ({
  backgroundColor: '#ffe4b3',
  minHeight: 'calc(100vh - 64px)',
  paddingTop: '64px',
  width: '100vw'
}));

export default PageWrapper;
