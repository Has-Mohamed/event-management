import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

const HiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  
  export function FileInput({ children, onChange, className = "",disabled }) {
    return (
      <IconButton component="label" className={className}>
        {children}
        <HiddenInput
        disabled={disabled}
          onChange={onChange}
          type="file"
          accept="image/svg+xml,image/png,image/jpeg,image/gif"
        />
      </IconButton>
    );
  }