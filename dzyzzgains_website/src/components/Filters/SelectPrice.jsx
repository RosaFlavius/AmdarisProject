import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./filters.styles.css";

export default function SelectPrice({ setSelectedPrice }) {
  const [price, setPrice] = React.useState("");

  const handleChange = (event) => {
    setPrice(event.target.value);
    setSelectedPrice(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Price</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={price}
          label="Price"
          onChange={handleChange}
          className="select-filter-style"
          style={{ background: "white" }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Ascending">Price ascending</MenuItem>
          <MenuItem value="Descending">Price descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
