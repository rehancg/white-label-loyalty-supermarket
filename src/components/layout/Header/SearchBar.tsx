import React from 'react';
import { Box, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { HEADER_STYLES } from './constants';

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Search products..." 
}) => {
  return (
    <Box sx={HEADER_STYLES.searchContainer}>
      <Box sx={HEADER_STYLES.searchBox}>
        <Search sx={{ color: 'text.secondary', mr: 1 }} />
        <InputBase
          placeholder={placeholder}
          sx={{
            flexGrow: 1,
            fontSize: '0.875rem',
            '& .MuiInputBase-input': {
              color: 'text.secondary',
            },
            '& .MuiInputBase-input::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            },
          }}
          aria-label="Search products"
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
