import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete24.svg";
import placeholderImage from "../../assets/images/placeholder.svg";
import { ReactComponent as AddIcon } from "../../assets/images/plus.svg";
import { CustomInput } from "../CustomTextField";

const SelectContainer = styled(FormControl)(({ theme }) => ({
  "& .selected-item": {
    display: "flex",
    marginBlockStart: 8,
  },
  "& .item-details": {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: 7,
    flex: "1 0 auto",
    backgroundColor: "#353535",
    border: "1px solid #535353",
  },
}));
const menuItemStyle = {
  borderBottom: "1px solid #696969 ",
};
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      backgroundColor: "#2f2f2f",
    },
  },
};

function CustomSelect({
  onChange,
  value,
  searchHandler,
  options,
  hasMoreItem,
  loadMore,
  removeItem,
  resetList,
  label,
  onAddUser,
  ...resetProps
}) {
  const filterItems = (e) => {
    const value = e.target.value;

    searchHandler(value);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (value.includes("")) return;
    onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <SelectContainer fullWidth variant="standard" margin="normal">
      <InputLabel shrink htmlFor={`${label}-input}`}>
        <span>
          {label} <span className="required">*</span>
        </span>
      </InputLabel>

      <Select
      {...resetProps}
        multiple
        displayEmpty
        value={value}
        onChange={handleChange}
        id={`${label}-input}`}
        onClose={resetList}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <em>Placeholder</em>;
          }

          return `${selected[0]?.first_name} ${selected[0]?.last_name}`;
        }}
        MenuProps={MenuProps}
        input={<CustomInput />}
      >
        {/* search input */}
        <MenuItem sx={{ p: 0, ...menuItemStyle }} value="">
          <CustomInput
            type="text"
            fullWidth
            placeholder="Search.."
            sx={{ border: "none !important" }}
            onChange={filterItems}
          />
        </MenuItem>

        {/* Add new item */}
        <MenuItem sx={{ p: 1.5, ...menuItemStyle }} value="">
          {/* this to prevent default filter behavior for the native HTML select */}
          <span style={{ opacity: 0 }}>.</span>
          <Box sx={{ mr: "auto" }}>Add New {label}</Box>
          <IconButton onClick={onAddUser}>
            <AddIcon />
          </IconButton>
        </MenuItem>

        {/* All items */}
        {options.map((item) => (
          <MenuItem
            key={item.id}
            value={item}
            className="select-menu-item"
            sx={menuItemStyle}
          >
            <img
              style={{ marginInlineEnd: 8 }}
              src={item.avatar || placeholderImage}
              alt="profile"
            />
            {/* this to prevent default filter behavior for the native HTML select */}
            <span style={{ opacity: 0 }}>.</span>
            <span>{`${item.first_name} ${item.last_name}`}</span>
          </MenuItem>
        ))}

        {/* Load more */}
        {hasMoreItem ? (
          <MenuItem
            sx={{ p: 1.5, ...menuItemStyle }}
            value=""
            onClick={loadMore}
          >
            {/* this to prevent default filter behavior for the native HTML select */}
            <span style={{ opacity: 0 }}>.</span>
            <Box component="span" sx={{ width: "100%", textAlign: "center" }}>
              load more
            </Box>
          </MenuItem>
        ) : null}
      </Select>

      {/* View selected items */}
      {value.map((item) => (
        <SelectedItem
          key={item.id}
          firstName={item.first_name}
          lastname={item.last_name}
          avatar={item.avatar}
          onDelete={() => removeItem(item.id)}
          disabledDelete={resetProps?.readOnly}
        />
      ))}
    </SelectContainer>
  );
}

export default CustomSelect;

const SelectedItem = ({ onDelete, avatar, firstName, lastname,disabledDelete }) => {
  return (
    <div className="selected-item">
      <div className="item-details">
        <img src={avatar || placeholderImage} alt="profile" />
        <Typography variant="body2">{`${firstName} ${lastname}`}</Typography>
        <Typography variant="caption" color="textSecondar"></Typography>
      </div>
      <IconButton onClick={onDelete} disabled={disabledDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};
