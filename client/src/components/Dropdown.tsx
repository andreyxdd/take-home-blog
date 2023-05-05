import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type DropdownProps = {
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
}

function Dropdown({ limit, setLimit }: DropdownProps) {
  const handleChange = (event: SelectChangeEvent) => {
    setLimit(Number(event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">Posts per page</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={String(limit)}
          label="Number of posts per page"
          onChange={handleChange}
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default Dropdown;
