import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { HEADER_STYLES } from './constants';

interface MobileMenuButtonProps {
  onToggle: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onToggle }) => {
  return (
    <Tooltip title="Open navigation menu">
      <IconButton
        color="inherit"
        aria-label="Open navigation menu"
        edge="start"
        onClick={onToggle}
        sx={{ mr: 2, ...HEADER_STYLES.iconButton }}
      >
        <MenuIcon />
      </IconButton>
    </Tooltip>
  );
};

export default MobileMenuButton;
