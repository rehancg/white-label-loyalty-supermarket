import React from 'react';
import {
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Person,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { HEADER_STYLES } from './constants';

interface ActionButtonsProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isDarkMode,
  onThemeToggle
}) => {
  return (
    <>
      <Tooltip title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
        <IconButton
          onClick={onThemeToggle}
          color="inherit"
          sx={HEADER_STYLES.iconButton}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Tooltip>

      <Tooltip title="User account">
        <IconButton
          color="inherit"
          sx={HEADER_STYLES.iconButton}
          aria-label="User account"
        >
          <Person />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default ActionButtons;
