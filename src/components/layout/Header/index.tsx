'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import Logo from './Logo';
import LanguageSelector from './LanguageSelector';
import ActionButtons from './ActionButtons';
import { HEADER_STYLES } from './constants';

interface HeaderProps {
  onThemeToggle: () => void;
  isDarkMode: boolean;
  language: string;
  onLanguageChange: (language: string) => void;
  cartCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  onThemeToggle,
  isDarkMode,
  language,
  onLanguageChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={HEADER_STYLES.appBar}
      >
        <Container>
        <Toolbar sx={HEADER_STYLES.toolbar}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />
          </Box>

          <Box sx={HEADER_STYLES.actionsContainer}>
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
              isMobile={isMobile}
            />
            
            <ActionButtons
              isDarkMode={isDarkMode}
              onThemeToggle={onThemeToggle}
            />
          </Box>
        </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;