import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { Receipt } from '@mui/icons-material';
import { CartItem } from '@/types';
import { ORDER_SUMMARY_STYLES } from './constants';

interface OrderSummaryProps {
  cartItems?: CartItem[];
  subtotal: number;
  discounts: {
    bogofDiscount: number;
    bulkDiscount: number;
  };
  totalDiscount: number;
  total: number;
  buttonText?: string;
  onButtonClick?: () => void;
  showCartItems?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems = [],
  subtotal,
  discounts,
  totalDiscount,
  total,
  buttonText = "Proceed to Checkout",
  onButtonClick,
  showCartItems = false,
}) => {
  return (
    <Paper
      elevation={0}
      sx={ORDER_SUMMARY_STYLES.container}
      role="complementary"
      aria-labelledby="order-summary-title"
    >
      {/* Header */}
      <Box sx={ORDER_SUMMARY_STYLES.header}>
        <Typography 
          variant="h6" 
          sx={ORDER_SUMMARY_STYLES.headerTitle}
          id="order-summary-title"
        >
          <Receipt sx={ORDER_SUMMARY_STYLES.headerIcon} aria-hidden="true" />
          Order Summary
        </Typography>
      </Box>

      <Box sx={ORDER_SUMMARY_STYLES.content}>
        {/* Cart Items */}
        {showCartItems && cartItems.length > 0 && (
          <>
            <Box 
              sx={ORDER_SUMMARY_STYLES.cartItemsContainer}
              role="list"
              aria-label="Cart items in order"
            >
              {cartItems.map((item) => (
                <Box 
                  key={item.product.id} 
                  sx={ORDER_SUMMARY_STYLES.cartItem}
                  role="listitem"
                  aria-label={`${item.product.name}, quantity ${item.quantity}, £${(item.product.price * item.quantity).toFixed(2)}`}
                >
                  <Box sx={ORDER_SUMMARY_STYLES.cartItemHeader}>
                    <Typography variant="body2" sx={ORDER_SUMMARY_STYLES.cartItemName}>
                      {item.product.name}
                    </Typography>
                    <Typography variant="body2" sx={ORDER_SUMMARY_STYLES.cartItemPrice}>
                      £{(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={ORDER_SUMMARY_STYLES.cartItemQuantity}
                    aria-label={`Quantity: ${item.quantity}`}
                  >
                    Qty {item.quantity}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={ORDER_SUMMARY_STYLES.divider} />
          </>
        )}

        {/* Summary Details */}
        <Box 
          sx={ORDER_SUMMARY_STYLES.summaryContainer}
          role="region"
          aria-label="Order pricing breakdown"
        >
          <Box sx={ORDER_SUMMARY_STYLES.summaryRow}>
            <Typography variant="body2" sx={ORDER_SUMMARY_STYLES.summaryLabel}>
              Subtotal
            </Typography>
            <Typography 
              variant="body2" 
              sx={ORDER_SUMMARY_STYLES.summaryValue}
              aria-label={`Subtotal: £${subtotal.toFixed(2)}`}
            >
              £{subtotal.toFixed(2)}
            </Typography>
          </Box>
          
          {/* BOGOF Discount */}
          {discounts.bogofDiscount > 0 && (
            <Box sx={ORDER_SUMMARY_STYLES.summaryRow}>
              <Typography variant="body2" sx={ORDER_SUMMARY_STYLES.discountLabel}>
                BOGOF Discount
              </Typography>
              <Typography 
                variant="body2" 
                sx={ORDER_SUMMARY_STYLES.discountValue}
                aria-label={`Buy one get one free discount: £${discounts.bogofDiscount.toFixed(2)}`}
              >
                -£{discounts.bogofDiscount.toFixed(2)}
              </Typography>
            </Box>
          )}
          
          {/* Bulk Discount */}
          {discounts.bulkDiscount > 0 && (
            <Box sx={ORDER_SUMMARY_STYLES.summaryRow}>
              <Typography variant="body2" sx={ORDER_SUMMARY_STYLES.discountLabel}>
                Bulk Discount (20% off £10+)
              </Typography>
              <Typography 
                variant="body2" 
                sx={ORDER_SUMMARY_STYLES.discountValue}
                aria-label={`Bulk discount 20% off orders over £10: £${discounts.bulkDiscount.toFixed(2)}`}
              >
                -£{discounts.bulkDiscount.toFixed(2)}
              </Typography>
            </Box>
          )}
          
          {/* Total Discount */}
          {totalDiscount > 0 && (
            <Box sx={ORDER_SUMMARY_STYLES.totalDiscountRow}>
              <Typography variant="body2" sx={ORDER_SUMMARY_STYLES.totalDiscountLabel}>
                Total Discount
              </Typography>
              <Typography 
                variant="body2" 
                sx={ORDER_SUMMARY_STYLES.totalDiscountValue}
                aria-label={`Total discount: £${totalDiscount.toFixed(2)}`}
              >
                -£{totalDiscount.toFixed(2)}
              </Typography>
            </Box>
          )}

          <Divider sx={ORDER_SUMMARY_STYLES.divider} />

          <Box sx={ORDER_SUMMARY_STYLES.totalRow}>
            <Typography variant="h6" sx={ORDER_SUMMARY_STYLES.totalLabel}>
              Total
            </Typography>
            <Typography
              variant="h6"
              sx={ORDER_SUMMARY_STYLES.totalValue}
              aria-label={`Total amount: £${total.toFixed(2)}`}
              role="status"
              aria-live="polite"
            >
              £{total.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Action Button */}
        {onButtonClick && (
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={onButtonClick}
            sx={ORDER_SUMMARY_STYLES.actionButton}
            aria-label={`${buttonText} - Total: £${total.toFixed(2)}`}
          >
            {buttonText}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default OrderSummary;
