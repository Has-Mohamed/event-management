import styled from "@emotion/styled";
import {
  FormControl,
  IconButton,
  InputLabel,
  Typography,
  FormHelperText,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as UploadIcon } from "../../assets/images/upload.svg";
import { ReactComponent as EditIcon } from "../../assets/images/Edit24.svg";
import { ReactComponent as RemoveIcon } from "../../assets/images/remove-image.svg";
import { FileInput } from "../Shared/FileInput";


const Style = styled("div")({
  marginTop: 16,
  marginBottom: 8,
  "& .upload-box": {
    border: "1px dashed #757575",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 188,
  },

  "& .drop-over": {
    position: "relative",
    "&::before": {
      content: "'Drop image here'",
      backgroundColor: "#322525eb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1,
    },
  },
  "& .upload-button": {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF0D",
  },
  "& .uploaded-image": {
    width: "100%",
    height: "100%",
  },

  "& .image-container": {
    position: "relative",
    height: "100%",
    width: "100%",
  },
  "& .image-actions": {
    position: "absolute",
    top: 10,
    insetInlineEnd: 10,
    "& .edit-button": {
        padding:2
    },
    "& .remove-button, .edit-button": {
      backgroundColor: "black",
      borderRadius: 0,
      display: "inline-block",
      marginInlineStart: 8,
      width: 36,
      height: 36,
    },
  },
});

function SelectImage({value,onChange,readOnly}) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
      const file = event.target.files[0];
    handleFileValidation(file);
  };

  const handleFileValidation = (file) => {
    if (file) {
      const image = new Image();
      image.onload = () => {
        if (image.width <= 800 && image.height <= 400) {
          onChange(file);
          setErrorMessage("");
        } else {
          setErrorMessage("Image dimensions should not exceed 800x400 pixels.");
        }
      };
      image.src = URL.createObjectURL(file);
    }
  };

  const onDragOver = (e) => {
    if (value || readOnly) return;
    e.preventDefault();

    e.currentTarget.classList.add("drop-over");
  };
  const onDragLeave = (e) => {
    if (value || readOnly) return;
    e.preventDefault();

    e.currentTarget.classList.remove("drop-over");
  };
  const onDrop = (e) => {
    if (value || readOnly) return;
    e.preventDefault();

    e.currentTarget.classList.remove("drop-over");
    const file = e.dataTransfer.files[0];
    handleFileValidation(file);
  };

  const removeImage = () => onChange(null);
  return (
    <Style>
      <InputLabel shrink htmlFor="Title-input">
        Thumbnail
      </InputLabel>
      <div
        className="upload-box"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {value ? (
          <div className="image-container">
            <div className="image-actions">
              <IconButton className="remove-button" onClick={removeImage}>
                <RemoveIcon />
              </IconButton>
              <FileInput className="edit-button" onChange={handleFileChange}
              disabled={readOnly}
              >
                <EditIcon />
              </FileInput>
            </div>
            <img
              src={URL.createObjectURL(value)}
              className="uploaded-image"
              alt="Selected"
            />
          </div>
        ) : (
          <>
            <FileInput disabled={readOnly} className="upload-button" onChange={handleFileChange}>
              <UploadIcon />
            </FileInput>

            <div>
              <Typography fontWeight="600" variant="body2" component="span">
                Click to upload{" "}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                color="textSecondary"
              >
                or drag and drop
              </Typography>
            </div>
            <Typography variant="body2" color="textSecondary">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </Typography>
          </>
        )}
      </div>
      <FormHelperText error>{errorMessage}</FormHelperText>
    </Style>
  );
}

export default SelectImage;


