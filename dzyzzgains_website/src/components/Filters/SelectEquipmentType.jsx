import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { EquipmentType } from "../../Enums/EquipmentType.ts";

export default function SelectEquipmentType({ setSelectedEquipmentType }) {
  const [equipmentType, setEquipmentType] = React.useState("");

  const handleChange = (event) => {
    setEquipmentType(event.target.value);
    setSelectedEquipmentType(EquipmentType[event.target.value]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Equipment Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={equipmentType}
          label="Equipment Type"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={EquipmentType.Dumbbells}>Dumbbells</MenuItem>
          <MenuItem value={EquipmentType["Gym Benches"]}>Gym Benches</MenuItem>
          <MenuItem value={EquipmentType.Kettlebells}>Kettlebells</MenuItem>
          <MenuItem value={EquipmentType["Pull Up and Push Up Bars"]}>
            Pull Up and Push Up Bars
          </MenuItem>
          <MenuItem
            value={EquipmentType["Weight Lifting Belts and Gym Gloves"]}
          >
            Weight Lifting Belts and Gym Gloves
          </MenuItem>
          <MenuItem value={EquipmentType["Weight Plates and Bars"]}>
            Weight Plates and Bars
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
