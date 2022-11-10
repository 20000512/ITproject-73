import avatarImg from "../../assets/avatar.jpg";
import {
  Box,
  Typography,
  Modal,
  TextField,
  Stack,
  Button,
} from "@mui/material";
import PageWrapper from "../../components/pagewrapper";
import NavBarWrapper from "../../components/navbarwrapper";
import Navpagewrapper from "../../components/navpagewrapper";
import { useEffect, useState } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import React from "react";
import axios from "axios";
import { host } from "../host";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import toast from "react-hot-toast";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

const Edit = () => {
  const navigate = useNavigate();

  // Store URL parameters
  const [searchParams] = useSearchParams(); // type/id
  // Store type of operation: add or edit
  const type = searchParams.get("type");
  // Store recipe ID if the operation is edit
  const [id, setId] = useState("");
  // Store dataURL of the recipe's cover image
  const [cover, setCover] = useState("");
  // Store recipe's title
  const [title, setTitle] = useState("");
  // Store recipe's description
  const [description, setDescription] = useState("");
  // Store recipe's content
  const [content, setContent] = useState("");
  const [avatar, setAvatar] = useState(avatarImg);

  const handleChooseImg = (e) => {
    e.preventDefault();
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".jpg, .jpeg, .png";
    input.click();
    input.onchange = async () => {
      try {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setAvatar(reader.result.toString() || "");
          const url = reader.result;
          setCover(url);
        });
        reader.readAsDataURL(input.files[0]);
      } catch (error) {
        toast.error("Upload error");
      }
    };
  };

  // Utility function: Save recipe to server
  const saveRecipe = (recipe) => {
    // New recipe saved to server
    if (type === "new") {
      // Add new recipe to server
      axios
        .post(host + "/recipes/add", recipe, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("username"),
          },
        })
        .then(
          // New recipe added to server
          (res) => {
            console.log(res.data);
            // Navigate to home page
            navigate("/");
          }
        )
        .catch(
          // Error occured when adding new recipe to server
          (err) => {
            console.error(err);
          }
        );
    }
    // Edit recipe saved to server
    else if (type === "edit") {
      // Update recipe to server
      axios
        .put(host + "/recipes/update/" + id, recipe, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("username"),
          },
        })
        .then(
          // Recipe updated to server
          (res) => {
            console.log(res.data);
            // Navigate to home page
            navigate("/");
          }
        )
        .catch(
          // Error occured when updating recipe to server
          (err) => {
            console.error(err);
          }
        );
    }
  };

  // Handler: Save draft recipes to server
  const handleSave = () => {
    // Create draft recipe object
    const recipe = {
      title: title,
      description: description,
      cover: cover,
      content: content,
      state: "draft",
    };

    // Save draft recipe to server
    saveRecipe(recipe);
  };

  // Handler: Save published recipes to server
  const handleClick = () => {
    // Create published recipe object
    const recipe = {
      title: title,
      description: description,
      cover: cover,
      content: content,
      state: "published",
    };

    // Save published recipe to server
    saveRecipe(recipe);
  };

  const handleEdit = (content, delta, source, editor) => {
    setContent(editor.getHTML());
  };

  // Initial load: Load draft recipe if operation is edit
  useEffect(() => {
    if (type === "edit") {
      // Parse JS object from JSON string
      const draft = JSON.parse(localStorage.getItem("tempDraft"));
      // Remove draft recipe object once it has been parsed
      localStorage.removeItem("tempDraft");

      // Store recipe fields in local variables
      if (draft) {
        setId(draft._id);
        setCover(draft.cover);
        setTitle(draft.title);
        setDescription(draft.description);
        setContent(draft.content);
      }
    }
  }, []);

  // Return formatting of the profile page
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
          <ArrowBackIosIcon
            sx={{ cursor: "pointer", position: "absolute", left: "30px" }}
            onClick={() => navigate(-1)}
          />
          <Typography variant="h5">
            {type === "new" ? "New Post" : "Edit"}
          </Typography>
        </Box>
      </NavBarWrapper>
      <Navpagewrapper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form noValidate autoComplete="off">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "auto",
                width: "1000px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  id="outlined-name"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  margin="normal"
                  variant="outlined"
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  marginTop: "20px",
                  width: "80",
                }}
              >
                <AddPhotoAlternateIcon onClick={handleChooseImg} />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  position: "relative",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  label="Description"
                  multiline
                  rows={4}
                  variant="filled"
                  value={description}
                  margin="normal"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                  paddingBottom: "80px",
                  position: "relative",
                }}
              >
                <TextField
                  sx={{ width: "100%" }}
                  label="Content"
                  multiline
                  rows={15}
                  variant="filled"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Box>
            </Box>
          </form>
        </Box>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              onClick={handleClick}
              label="Publish"
              icon={<SaveIcon />}
            />
            <BottomNavigationAction
              onClick={handleSave}
              label="Save as Draft"
              icon={<SaveAsIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Navpagewrapper>
    </PageWrapper>
  );
};

export default Edit;
