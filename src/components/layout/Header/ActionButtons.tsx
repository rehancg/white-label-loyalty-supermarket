import React from 'react';
import {
  IconButton,
  Tooltip,
  Badge,
} from '@mui/material';
import {
  Person,
  LightMode,
  DarkMode,
  ShoppingCart,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { HEADER_STYLES } from './constants';
import { useAppSelector } from '@/store/hooks';

interface ActionButtonsProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isDarkMode,
  onThemeToggle
}) => {
  const router = useRouter();
  const cartItems = useAppSelector(state => state.cart.totalItems);

  const handleCartClick = () => {
    router.push('/checkout');
  };

  return (
    <>
      <Tooltip title="Shopping cart">
        <IconButton
          onClick={handleCartClick}
          color="inherit"
          sx={HEADER_STYLES.iconButton}
          aria-label="Shopping cart"
        >
          <Badge badgeContent={cartItems} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Tooltip>

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
