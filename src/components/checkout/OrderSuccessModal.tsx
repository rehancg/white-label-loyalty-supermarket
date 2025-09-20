import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import {
  CheckCircle,
  Close,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { CHECKOUT_STYLES } from './constants';

interface OrderSuccessModalProps {
  open: boolean;
  orderId?: string;
  onClose: () => void;
  onNavigateHome: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  open,
  orderId,
  onClose,
  onNavigateHome,
}) => {
  const router = useRouter();

  const handleOkClick = () => {
    onClose();
    onNavigateHome();
    router.push('/');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="order-success-title"
      aria-describedby="order-success-description"
      slotProps={{
        paper: {
          sx: CHECKOUT_STYLES.orderSuccessModal.dialog,
        },
      }}
    >
      <DialogTitle
        id="order-success-title"
        sx={CHECKOUT_STYLES.orderSuccessModal.title}
      >
        <Box sx={CHECKOUT_STYLES.orderSuccessModal.titleContent}>
          <CheckCircle 
            sx={CHECKOUT_STYLES.orderSuccessModal.successIcon}
            aria-hidden="true"
          />
          <Typography variant="h6" component="span" sx={CHECKOUT_STYLES.orderSuccessModal.titleText}>
            Order Placed Successfully!
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close dialog"
          sx={CHECKOUT_STYLES.orderSuccessModal.closeButton}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={CHECKOUT_STYLES.orderSuccessModal.content}>
        <Box sx={CHECKOUT_STYLES.orderSuccessModal.messageContainer}>
          <Typography
            variant="body1"
            color="text.primary"
            sx={CHECKOUT_STYLES.orderSuccessModal.messageText}
          >
            Thank you for your order! Your items will be processed and shipped soon.
          </Typography>
          
          {orderId && (
            <Box sx={CHECKOUT_STYLES.orderSuccessModal.orderIdContainer}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={CHECKOUT_STYLES.orderSuccessModal.orderIdLabel}
              >
                Order Number:
              </Typography>
              <Typography
                variant="h6"
                component="span"
                sx={CHECKOUT_STYLES.orderSuccessModal.orderIdValue}
              >
                {orderId}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={CHECKOUT_STYLES.orderSuccessModal.confirmationText}>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            You will receive an email confirmation shortly with your order details and tracking information.
          </Typography>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions sx={CHECKOUT_STYLES.orderSuccessModal.actions}>
        <Button
          onClick={handleOkClick}
          variant="contained"
          fullWidth
          size="large"
          sx={CHECKOUT_STYLES.orderSuccessModal.okButton}
          aria-label="Return to home page"
        >
          Return to Home
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderSuccessModal;
