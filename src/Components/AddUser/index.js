import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "@emotion/styled";
import { FileInput } from "../Shared/FileInput";
import { ReactComponent as UploadIcon } from "../../assets/images/upload.svg";
import placeholder from "../../assets/images/placeholder.svg";
import {
    CircularProgress,
  FormControl,
  FormHelperText,
  InputLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import { CustomInput } from "../CustomTextField";
import { createUser } from "../../services/createAxiosClient";

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  display: "flex",
  paddingInline: 24,
  paddingBottom: 16,
  "& .add": {
    backgroundColor: "white",
    color: "black",
  },
  "& .cancel": {
    backgroundColor: "#2D2D2D",
    color: "white !important",
  },
  "& button": {
    flex: "1",
    borderRadius: 0,
    fontWeight: 600,
  },
}));
const DialogContainer = styled(DialogContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  "& .required": {
    color: "red",
  },
  "& .upload-box": {
    width: 158,
    height: 158,
    border: "1px dashed #757575",
    backgroundImage: `url(${placeholder})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBlock: 16,
    overflow: "hidden",
  },
  "& .uploaded-image": {
    height: "100%",
    width: "auto",
  },
}));

const initialData = {
    image: "",
    first_name: "",
    last_name: "",
    email: "",
  }
export default function AddUser({ type, open, handleOpen }) {
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    
  const [userData, setUserData] = React.useState(initialData);
  const [errorMessges, setErrorMessges] = React.useState({
    image: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  const userHandler = ({ key, value }) => {
    setUserData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSnackbar = () => {
    setSnackbarOpen((prev)=>!prev);
  };
  const handleClose = () => {
    handleOpen(false);
    setUserData(initialData)
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileHandler(file);
  };

  const fileHandler = (file) => {
    if (file) {
      const image = new Image();
      image.onload = () => {
        userHandler({ key: "image", value: file });
      };
      image.src = URL.createObjectURL(file);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();

    e.currentTarget.classList.add("drop-over");
  };
  const onDragLeave = (e) => {
    e.preventDefault();

    e.currentTarget.classList.remove("drop-over");
  };
  const onDrop = (e) => {
    e.preventDefault();

    e.currentTarget.classList.remove("drop-over");
    const file = e.dataTransfer.files[0];
    fileHandler(file);
  };

  const formatUserData = () => {
    let data = {
      ...userData,

      event_id: 19,
    };

    const file = userData.image;
    if (file) {
      const image = new FormData();
      image.append("image", file);
      image.append("name", file.name);
      data = {
        ...data,
        image,
      };
    }
    return data;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const data = formatUserData();
    const res = await createUser(data);
    setLoading(false)

    if (res?.status === 200 || res?.status === 201) {
      handleClose();
      handleSnackbar();

    } else if (res?.response?.status === 422) {
      let errors = {};
      
      Object.keys(res.response.data).forEach((key) => {
        errors = { ...errors, [key]: res.response.data[key].join(", ") };
      });
      setErrorMessges((prev) => ({
        ...prev,
        ...errors,
      }));
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={600}>Add {type}</DialogTitle>
        <DialogContainer>
          <Typography
            fontWeight={600}
            variant="body2"
            sx={{ alignSelf: "self-start" }}
          >
            Photo
          </Typography>
          <div
            className="upload-box "
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {userData.image ? (
              <img
                src={URL.createObjectURL(userData.image)}
                className="uploaded-image"
                alt="Selected"
              />
            ) : (
              <>
                <FileInput
                  className="upload-button"
                  onChange={handleFileChange}
                >
                  <UploadIcon />
                </FileInput>

                <div>
                  <Typography fontWeight="600" variant="body2" component="span">
                    Click to upload{" "}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    or drag and drop
                  </Typography>
                </div>
              </>
            )}
          </div>
          <form onSubmit={onSubmit} id="create-user-form">
            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel shrink htmlFor="first-name-input">
                <span>
                  First Name <span className="required">*</span>
                </span>
              </InputLabel>
              <CustomInput
                fullWidth
                id="first-name-input"
                placeholder="Name"
                required
                onChange={(e) =>
                  userHandler({ key: "first_name", value: e.target.value })
                }
                value={userData.first_name}
              />
              {errorMessges?.first_name && (
                <FormHelperText error>
                  {errorMessges?.first_name}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel shrink htmlFor="last-name-input">
                <span>
                  Last Name <span className="required">*</span>
                </span>
              </InputLabel>
              <CustomInput
                fullWidth
                id="last-name-input"
                placeholder="Name"
                required
                onChange={(e) =>
                  userHandler({ key: "last_name", value: e.target.value })
                }
                value={userData.last_name}
              />
              {errorMessges?.last_name && (
                <FormHelperText error>{errorMessges?.last_name}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth variant="standard" margin="normal">
              <InputLabel shrink htmlFor="email-input">
                <span>
                  Email
                  <span className="required">*</span>
                </span>
              </InputLabel>
              <CustomInput
                type="email"
                fullWidth
                id="email-input"
                placeholder="email"
                onChange={(e) =>
                  userHandler({ key: "email", value: e.target.value })
                }
                value={userData.email}
                required
              />
              {errorMessges?.email && (
                <FormHelperText error>{errorMessges?.email}</FormHelperText>
              )}
            </FormControl>
          </form>
        </DialogContainer>
        <StyledDialogActions>
          <Button className="cancel" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="add" type="submit" form="create-user-form">
            Add
            {loading && (
          <CircularProgress
            size={24}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '24px',
            }}
          />
        )}
          </Button>
        </StyledDialogActions>
        
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbar}
        message="User has been added successfully"
        // action={action}
      />
    </div>
  );
}
