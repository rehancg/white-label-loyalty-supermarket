import React from 'react';
import { Box, Link } from '@mui/material';
import { FOOTER_LINKS, FOOTER_STYLES } from './constants';

const FooterLinks: React.FC = () => {
  return (
    <Box sx={FOOTER_STYLES.linksContainer}>
      {FOOTER_LINKS.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          sx={FOOTER_STYLES.link}
          aria-label={link.label}
        >
          {link.label}
        </Link>
      ))}
    </Box>
  );
};

export default FooterLinks;
