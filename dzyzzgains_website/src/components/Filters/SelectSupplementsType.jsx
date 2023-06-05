import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { SupplementsType } from "../../Enums/SupplementsType.ts";

export default function SelectSupplementsType({ setSelectedSupplementsType }) {
  const [supplementType, setSupplementType] = React.useState("");

  const handleChange = (event) => {
    setSupplementType(event.target.value);
    setSelectedSupplementsType(SupplementsType[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Supplement Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={supplementType}
          label="Supplement Type"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={SupplementsType.Creatine}>Creatine</MenuItem>
          <MenuItem value={SupplementsType["Food and snacks"]}>
            Food and snacks
          </MenuItem>
          <MenuItem value={SupplementsType.Proteines}>Proteines</MenuItem>
          <MenuItem value={SupplementsType.Vitamins}>Vitamins</MenuItem>
          <MenuItem value={SupplementsType["Weight Gainers"]}>
            Weight Gainers
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
