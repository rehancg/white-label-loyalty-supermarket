import React from 'react';
import { Typography } from '@mui/material';
import { COMPANY_INFO, FOOTER_STYLES } from './constants';

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" sx={FOOTER_STYLES.copyright}>
      © {COMPANY_INFO.year} {COMPANY_INFO.name}. All rights reserved.
    </Typography>
  );
};

export default Copyright;
