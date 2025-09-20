import React, { forwardRef, useImperativeHandle } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import { Login, Person } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CHECKOUT_STYLES } from "./constants";
import { loginSchema, LoginFormData } from "@/schemas/checkout";

interface LoginSectionProps {
  mode: "login" | "guest";
  onModeChange: (mode: "login" | "guest") => void;
  onLoginSubmit?: (data: LoginFormData) => void;
  onGuestCheckout?: () => void;
  isLoggedIn?: boolean;
  userEmail?: string;
}

export interface LoginSectionRef {
  trigger: () => Promise<boolean>;
  getValues: () => LoginFormData;
}

const LoginSection = forwardRef<LoginSectionRef, LoginSectionProps>(
  (
    {
      mode,
      onModeChange,
      onLoginSubmit,
      onGuestCheckout,
      isLoggedIn,
      userEmail,
    },
    ref
  ) => {
    const {
      control,
      handleSubmit,
      formState: { errors, isValid },
      reset,
      trigger,
      getValues,
    } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      mode: "onChange",
      defaultValues: {
        email: "",
        password: "",
      },
    });

    useImperativeHandle(ref, () => ({
      trigger: async () => {
        return await trigger();
      },
      getValues: () => {
        return getValues();
      },
    }));

    const onSubmit = (data: LoginFormData) => {
      if (onLoginSubmit) {
        onLoginSubmit(data);
      }
    };

    // Reset form when mode changes
    React.useEffect(() => {
      reset();
    }, [mode, reset]);

    return (
      <Paper
        elevation={0}
        sx={CHECKOUT_STYLES.formSection.container}
        role="region"
        aria-labelledby="login-section-title"
      >
        <Box sx={CHECKOUT_STYLES.formSection.content}>
          <Typography
            variant="h6"
            sx={CHECKOUT_STYLES.formSection.title}
            id="login-section-title"
          >
            <Login
              sx={CHECKOUT_STYLES.formSection.titleIcon}
              aria-hidden="true"
            />
            Account & Login
          </Typography>

          {/* Mode Selection Buttons - Always show */}
          {(!isLoggedIn || (isLoggedIn && !userEmail)) && (
            <Box
              sx={CHECKOUT_STYLES.formSection.modeButtons}
              role="group"
              aria-label="Choose checkout method"
            >
              <Button
                variant={mode === "login" ? "contained" : "outlined"}
                onClick={() => onModeChange("login")}
                sx={CHECKOUT_STYLES.formSection.modeButton}
                aria-pressed={mode === "login"}
                aria-label="Login with existing account"
              >
                <Login sx={{ fontSize: "1rem", mr: 1 }} aria-hidden="true" />
                Login
              </Button>
              <Button
                variant={mode === "guest" ? "contained" : "outlined"}
                onClick={() => {
                  onModeChange("guest");
                  if (onGuestCheckout) {
                    onGuestCheckout();
                  }
                }}
                sx={CHECKOUT_STYLES.formSection.modeButton}
                aria-pressed={mode === "guest"}
                aria-label="Continue as guest without account"
              >
                <Person sx={{ fontSize: "1rem", mr: 1 }} aria-hidden="true" />
                Checkout as Guest
              </Button>
            </Box>
          )}

          {/* Login Form - Show when login mode is selected */}
          {!isLoggedIn && mode === "login" && (
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={CHECKOUT_STYLES.formSection.formContainer}
              role="form"
              aria-label="Login form"
              noValidate
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Email Address"
                    placeholder="you@example.com"
                    variant="outlined"
                    type="email"
                    sx={CHECKOUT_STYLES.formSection.textField}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "email-error" : "email-help"
                    }
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Password"
                    type="password"
                    placeholder="******"
                    variant="outlined"
                    sx={CHECKOUT_STYLES.formSection.textField}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    aria-describedby={
                      errors.password ? "password-error" : "password-help"
                    }
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={CHECKOUT_STYLES.formSection.button}
                aria-label="Login to your account"
                disabled={!isValid}
              >
                Login
              </Button>
            </Box>
          )}

          {/* Guest Checkout Message */}
          {mode === "guest" && (
            <Box
              sx={CHECKOUT_STYLES.formSection.guestMessage}
              role="region"
              aria-label="Guest checkout information"
            >
              <Typography
                variant="body2"
                sx={CHECKOUT_STYLES.formSection.guestText}
              >
                Continue as guest to complete your purchase. You can create an
                account later.
              </Typography>
            </Box>
          )}

          {/* Welcome Section - Show when logged in (not guest) */}
          {isLoggedIn && userEmail && (
            <Box
            sx={CHECKOUT_STYLES.formSection.guestMessage}
              role="region"
              aria-label="Welcome message"
            >
              <Typography
                variant="h4"
                sx={CHECKOUT_STYLES.formSection.guestText}
              >
                Welcome back!
              </Typography>
              <Typography
                variant="body2"
                sx={CHECKOUT_STYLES.formSection.guestText}
              >
                You can now proceed with your checkout.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    );
  }
);

LoginSection.displayName = "LoginSection";

export default LoginSection;
