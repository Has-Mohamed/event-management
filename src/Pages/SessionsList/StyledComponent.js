import { styled } from "@mui/material";
import React from "react";

const Style = styled("div")(({ theme }) => ({
  width: "100%",
  padding: 16,

  "& .MuiTableRow-head .MuiTableCell-head": {
    textAlign: "center",
  },
  "& .table-cell-icon": {
    verticalAlign: "middle",
    marginInlineEnd: 8,
  },
  "& .pagenation-container": {
    backgroundColor: "#1A1A1A66",
    padding: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& .MuiButtonBase-root.MuiPaginationItem-root": {
    margin: 0,
    borderRadius: 0,
  },
  "& .profile-image": {
    width: 34,
    height: 34,
    borderRadius: 4,
  },
}));
function StyledComponent({ children }) {
  return <Style>{children}</Style>;
}

export default StyledComponent;
