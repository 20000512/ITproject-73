import { Box, Tabs, Tab, Typography } from "@mui/material";
import PageWrapper from "../components/pagewrapper";
import NavBarWrapper from "../components/navbarwrapper";
import Navpagewrapper from "../components/navpagewrapper";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "./host";
import axios from "axios";
import ItemCard from "../components/itemcard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
const Category = () => {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState("");
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      type: "Ingredient",
      list: ["Beef", "Pork", "Chicken", "Fish", "Rice", "Noodle", "Pasta"],
    },
    {
      id: 2,
      type: "Cuisine",
      list: ["French", "Chinese", "Japanese", "Italian", "American", "Indian", "German"],
    },
    {
      id: 3,
      type: "Special",
      list: ["Vegan", "Gluten-free", "Vegetarian", "No nuts"],
    },
  ]);
  useEffect(() => {
    console.log(keywords);
    const expensesListResp = async () => {
      if (keywords) {
        // Keyword not empty, get search results
        await axios
          .get(host + "/recipes/search/" + keywords)
          .then((response) => {
            // Store search results
            setResults(response.data.data);
            // Show search results
            setShow(true);
          });
      }
    };
    expensesListResp();
  }, [keywords]);

  const [active, setActive] = useState(data[0]);
  return (
    <PageWrapper>
      <NavBarWrapper>
        <Box
          sx={{
            width: "100%",
            height: "64px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {show ? (
            <ArrowBackIosIcon
              sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
              onClick={() => {
                setShow(false);
                setKeywords("");
              }}
            />
          ) : (
            ""
          )}
          <Typography variant="h5">Category</Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: "30px",
          }}
        >
          {show ? (
            <Box sx={{ width: "100%", maxWidth: "1000px" }}>
              {results.map((e) => (
                <ItemCard
                  onClick={() => navigate("/detail/" + e._id)}
                  sx={{ mb: "30px" }}
                  key={e._id}
                  title={e.title}
                  cover={e.cover}
                  description={e.description}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, width: "100%", display: "flex" }}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={active}
                onChange={() => console.log("Active")}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {data.map((e, index) => (
                  <Tab
                    key={index}
                    label={e.type}
                    sx={{
                      backgroundColor:
                        active.id === e.id ? "#f57c18" : "transparent",
                    }}
                    onClick={() => setActive(e)}
                  />
                ))}
              </Tabs>
              <Box sx={{ display: "flex" }}>
                {active.list.map((ele, index) => (
                  <Typography
                    sx={{ px: "16px", py: "8px" }}
                    onClick={() => setKeywords(ele)}
                    key={index}
                  >
                    {ele}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Navpagewrapper>
    </PageWrapper>
  );
};
export default Category;
