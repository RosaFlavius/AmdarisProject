import React, { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import Divider from '@mui/material/Divider';
import SubListFilter from "./SubListFilter";

const FilterDropdown = ({ selected, setSelected }) => {
    const [open, setOpen] = useState(false);
  
    const handleClick = () => {
      setOpen(!open);
    };
    return (
      <List
        sx={{ width: "100%", maxWidth: 250, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Filters
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FilterListIcon />
          </ListItemIcon>
          <ListItemText primary="Product type" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <SubListFilter
              text="Supplements"
              selected={selected}
              setSelected={setSelected}
            />
            <Divider variant="inset" />
            <SubListFilter
              text="Equipment"
              selected={selected}
              setSelected={setSelected}
            />
            <Divider variant="inset" />
            <SubListFilter
              text="Clothes"
              selected={selected}
              setSelected={setSelected}
            />
            <Divider variant="inset" />
            <SubListFilter
              text="Remove filter"
              selected={selected}
              setSelected={setSelected}
            />
            <Divider variant="inset" />
          </List>
        </Collapse>
      </List>
    );
  };
  
  export default FilterDropdown;