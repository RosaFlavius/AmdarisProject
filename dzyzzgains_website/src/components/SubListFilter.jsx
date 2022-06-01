import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";

const SubListFilter = ({ text, selected, setSelected }) => {
  const handleClick = () => {
    setSelected(text);
  };
  return (
    <ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
      <ListItemIcon>
        {text === "Remove filter" ? (
          <FilterAltOffOutlinedIcon />
        ) : (
          <FilterAltOutlinedIcon />
        )}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItemButton>
  );
};

export default SubListFilter;