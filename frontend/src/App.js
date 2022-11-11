import "./App.css";
import { Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function App() {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const navigate = useNavigate();
  const routeList = ["/", "/search", "/category", "/profile"];
  const location = useLocation();

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
  }, [value]);

  useEffect(() => {
    if (ref.current) {
      if (!localStorage.getItem("username")) return navigate("/login");
      if (routeList.includes(location.pathname))
        setValue(routeList.indexOf(location.pathname));
    }
  }, []);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Outlet />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            navigate(routeList[newValue]);
          }}
          sx={{ position: "relative" }}
        >
          <BottomNavigationAction label="Home" icon={<HomeOutlinedIcon />} />
          <BottomNavigationAction
            label="Search"
            icon={<SearchOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Category"
            icon={<DashboardOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Profile"
            icon={<Person2OutlinedIcon />}
          />
          <IconButton
            onClick={() => navigate("/edit?type=new")}
            sx={{
              position: "absolute",
              top: "-15px",
              left: "calc(50% - 10px)",
              width: "40px",
              height: "40px",
              background: "#ffc967",
              borderRadius: "50%",
              "&:hover": { background: "#fabd51" },
            }}
            aria-label="delete"
            size="large"
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default App;
