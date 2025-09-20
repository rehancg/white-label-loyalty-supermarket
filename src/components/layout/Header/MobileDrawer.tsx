import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  Person,
} from '@mui/icons-material';
import Image from 'next/image';
import { HEADER_STYLES } from './constants';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ open, onClose }) => {
  const drawerContent = (
    <Box sx={HEADER_STYLES.drawer}>
      <Box sx={HEADER_STYLES.drawerHeader}>
        <Image
          src="/logo.png"
          alt="White Label Loyalty Supermarket Logo"
          width={48}
          height={48}
          style={{ marginBottom: '8px', borderRadius: '4px' }}
        />
        <Typography variant="h6" color="primary">
          White Label Loyalty
        </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem component="div" sx={HEADER_STYLES.listItem}>
          <ListItemIcon>
            <ShoppingCart />
          </ListItemIcon>
          <ListItemText primary="My Cart" />
        </ListItem>
        <ListItem component="div" sx={HEADER_STYLES.listItem}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: HEADER_STYLES.drawer.width,
        },
      }}
      aria-label="Mobile navigation menu"
    >
      {drawerContent}
    </Drawer>
  );
};

export default MobileDrawer;
