import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Category } from "../../Enums/Category.ts";

export default function SelectCategory({ setSelectedCategory }) {
  const [category, setCategory] = React.useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    setSelectedCategory(Category[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={Category.Supplements}>Supplements</MenuItem>
          <MenuItem value={Category.Equipment}>Equipment</MenuItem>
          <MenuItem value={Category.Clothes}>Clothes</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
