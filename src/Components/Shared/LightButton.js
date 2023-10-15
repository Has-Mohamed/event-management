import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const LightButton = styled(Button)(({ theme }) => ({
    backgroundColor:"white !important",
    borderRadius:0,
    paddingInline:16,
    color:"black",
    fontWeight:"600",
    "& path": {
        fill:"black"
    }
}));
