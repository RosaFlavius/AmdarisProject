import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ClothesSize } from "../../Enums/ClothesSize.ts";
import "./filters.styles.css";

export default function SelectSize({ setSelectedSize }) {
  const [size, setSize] = React.useState("");

  const handleChange = (event) => {
    setSize(event.target.value);
    setSelectedSize(ClothesSize[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="Size"
          onChange={handleChange}
          className="select-filter-style"
          style={{ background: "white" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={ClothesSize.XS}>XS</MenuItem>
          <MenuItem value={ClothesSize.S}>S</MenuItem>
          <MenuItem value={ClothesSize.M}>M</MenuItem>
          <MenuItem value={ClothesSize.L}>L</MenuItem>
          <MenuItem value={ClothesSize.XL}>XL</MenuItem>
          <MenuItem value={ClothesSize.XXL}>XXL</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
