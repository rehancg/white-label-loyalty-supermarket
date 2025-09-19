import React, { useState } from 'react';
import {
  Button,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { Language } from '@mui/icons-material';
import { LANGUAGES, HEADER_STYLES } from './constants';

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  isMobile: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  isMobile,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLangData = LANGUAGES.find(lang => lang.code === currentLanguage) || LANGUAGES[0];

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    handleMenuClose();
  };

  return (
    <>
      <Button
        onClick={handleMenuOpen}
        startIcon={<Language />}
        sx={HEADER_STYLES.languageButton}
        aria-label="Select language"
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="body2">{currentLangData.flag}</Typography>
          {!isMobile && (
            <Typography variant="body2">
              {currentLangData.code.toUpperCase()}
            </Typography>
          )}
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 160,
            }
          }
        }}
        aria-labelledby="language-menu"
      >
        {LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={lang.code === currentLanguage}
            aria-label={`Select ${lang.name}`}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography>{lang.flag}</Typography>
              <Typography variant="body2">{lang.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector;
