import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchButton({search}) {

return (
  <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="חיפוש"
      inputProps={{ 'aria-label': 'חיפוש' }}
      onChange ={search} />
    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
);
}
