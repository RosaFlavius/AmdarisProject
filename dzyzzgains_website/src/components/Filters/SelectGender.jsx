import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ClothesGender } from "../../Enums/ClothesGender.ts";

export default function SelectGender({ setSelectedGender }) {
  const [gender, setGender] = React.useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
    setSelectedGender(ClothesGender[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={ClothesGender.Men}>Men</MenuItem>
          <MenuItem value={ClothesGender.Woman}>Woman</MenuItem>
          <MenuItem value={ClothesGender.Kids}>Kids</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
