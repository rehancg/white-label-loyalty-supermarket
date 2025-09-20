import React from 'react';
import { Box, Typography, Card, CardContent, IconButton, Chip, Tooltip } from '@mui/material';
import { Add, Remove, Delete, LocalOffer } from '@mui/icons-material';
import { CartItem } from '@/types';
import { getProductIcon } from '@/utils/productIcons';
import { useAppDispatch } from '@/store/hooks';
import { updateQuantity, removeFromCart } from '@/store/cartSlice';
import { CART_STYLES } from './constants';

interface ProductSummaryProps {
  cartItems: CartItem[];
}

const ProductSummary: React.FC<ProductSummaryProps> = ({ cartItems }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (productId: string, currentQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: currentQuantity + 1 }));
  };

  const handleDecreaseQuantity = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ productId, quantity: currentQuantity - 1 }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Box 
      sx={CART_STYLES.productSummary.container}
      role="region"
      aria-labelledby="order-title"
    >
      <Typography 
        variant="h5" 
        sx={CART_STYLES.productSummary.sectionTitle}
        id="order-title"
      >
        <LocalOffer sx={CART_STYLES.productSummary.sectionIcon} aria-hidden="true" />
        Your Order ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
      </Typography>

      <Box 
        sx={CART_STYLES.productSummary.itemsContainer}
        role="list"
        aria-label="Cart items list"
      >
        {cartItems.map((item) => (
          <Card 
            key={item.product.id} 
            sx={CART_STYLES.productSummary.productCard}
            role="listitem"
            aria-labelledby={`product-name-${item.product.id}`}
            aria-describedby={`product-description-${item.product.id}`}
          >
            <CardContent sx={CART_STYLES.productSummary.cardContent}>
              <Box sx={CART_STYLES.productSummary.productLayout}>
                {/* Product Icon */}
                <Box 
                  sx={CART_STYLES.productSummary.productIcon}
                  aria-hidden="true"
                >
                  <Typography sx={CART_STYLES.productSummary.productIconText}>
                    {getProductIcon(item.product.category)}
                  </Typography>
                  {item.product.isBogof && (
                    <Chip
                      label="BOGOF"
                      size="small"
                      sx={CART_STYLES.productSummary.bogofChip}
                      aria-label="Buy one get one free offer"
                    />
                  )}
                </Box>

                {/* Product Details */}
                <Box sx={CART_STYLES.productSummary.productDetails}>
                  <Box sx={CART_STYLES.productSummary.productHeader}>
                    <Typography 
                      variant="h6" 
                      sx={CART_STYLES.productSummary.productName}
                      id={`product-name-${item.product.id}`}
                    >
                      {item.product.name}
                    </Typography>
                    
                    <Typography 
                      variant="h6" 
                      sx={CART_STYLES.productSummary.productPrice}
                      aria-label={`Price: £${item.product.price.toFixed(2)}`}
                    >
                      £{item.product.price.toFixed(2)}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    sx={CART_STYLES.productSummary.productDescription}
                    id={`product-description-${item.product.id}`}
                  >
                    {item.product.description}
                  </Typography>

                  {/* Quantity and Total */}
                  <Box mx={CART_STYLES.productSummary.quantityAndTotal} sx={CART_STYLES.productSummary.quantityAndTotalMobile}>
                    <Box sx={CART_STYLES.productSummary.quantitySection}>
                      <Typography 
                        variant="body2" 
                        sx={CART_STYLES.productSummary.quantityLabel}
                        id={`quantity-label-${item.product.id}`}
                      >
                        Quantity:
                      </Typography>
                      
                      <Box 
                        sx={CART_STYLES.productSummary.quantityControls}
                        role="group"
                        aria-labelledby={`quantity-label-${item.product.id}`}
                        aria-label={`Quantity controls for ${item.product.name}`}
                      >
                        <Tooltip title="Decrease quantity">
                          <IconButton
                            size="small"
                            sx={CART_STYLES.productSummary.quantityButton}
                            onClick={() => handleDecreaseQuantity(item.product.id, item.quantity)}
                            aria-label={`Decrease quantity of ${item.product.name}. Current quantity: ${item.quantity}`}
                            disabled={item.quantity <= 1}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        
                        <Typography 
                          variant="body1" 
                          sx={CART_STYLES.productSummary.quantityDisplay}
                          aria-label={`Current quantity: ${item.quantity}`}
                          role="status"
                          aria-live="polite"
                        >
                          {item.quantity}
                        </Typography>
                        
                        <Tooltip title="Increase quantity">
                          <IconButton
                            size="small"
                            sx={CART_STYLES.productSummary.quantityButtonIncrease}
                            onClick={() => handleIncreaseQuantity(item.product.id, item.quantity)}
                            aria-label={`Increase quantity of ${item.product.name}. Current quantity: ${item.quantity}`}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>

                    <Box mx={CART_STYLES.productSummary.totalSection} sx={CART_STYLES.productSummary.totalSectionMobile}>
                      <Typography 
                        variant="h6" 
                        sx={CART_STYLES.productSummary.itemTotal}
                        aria-label={`Total for ${item.product.name}: £${(item.product.price * item.quantity).toFixed(2)}`}
                      >
                        £{(item.product.price * item.quantity).toFixed(2)}
                      </Typography>
                      
                      <Tooltip title="Remove item">
                        <IconButton
                          size="small"
                          sx={CART_STYLES.productSummary.removeButton}
                          onClick={() => handleRemoveItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductSummary;
