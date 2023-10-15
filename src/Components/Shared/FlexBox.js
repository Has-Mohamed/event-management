import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

export const FlexBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}));
