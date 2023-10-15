import { styled } from "@mui/material";
import React from "react";

const Style = styled("div")(({ theme }) => ({
  width: "100%",
  padding: 16,

  "& .form-container":{
    // marginInline:226,
    "& label.Mui-focused":{
      color:"#ffffffb3 !important"
    },
    "& .required":{
      color:"#FDA29B"
    },
    backgroundColor: "#2E2E2E",
    padding:"40px 40px 60px"
  },

  "& .date-time-container":{
    display:"flex",
    gap:16,
    "& .MuiFormControl-root":{
      flex: "1 auto"
    },
    "& .MuiFormControl-root:first-of-type":{
      flex: "1 50%"
    }
  },
  "& .selected-venue":{
    marginTop:16,
    height:85,
    display:"flex",
    alignItems:"center",
    backgroundColor:"#3C3C3C",
    "& img":{
      marginInlineEnd:12,
      height:"100%",
      width:"auto"
    },
    
  }
}));
function StyledComponent({ children }) {
  return (
    <Style>
      {children}
    </Style>
  );
}

export default StyledComponent;
