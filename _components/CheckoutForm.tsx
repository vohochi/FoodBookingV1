'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AddressForm from '@/_components/checkout/AddressForm';
import Info from '@/_components/checkout/Info';
import InfoMobile from '@/_components/checkout/InfoMobile';
import PaymentForm from '@/_components/checkout/PaymentForm';
import Review from '@/_components/checkout/Review';
import AppTheme from '@/layout/shared-theme/AppTheme';
import {
  selectCartItems,
  selectCartTotalPrice,
} from '@/store/selector/cartSelectors';

import { formatPrice } from '@/utils/priceVN';
import { useDispatch, useSelector } from 'react-redux';
import { Address } from '@/types/User';
import { createOrderInfo } from '@/_lib/orders';
import SnackbarNotification from './SnackbarAlert';
import { CheckoutSuccessPage } from './CheckoutSuccessPage';
import { clearCart } from '@/store/slice/cartSlice';
import { RootState } from '@/store';

const steps = ['Địa chỉ giao hàng', 'Chi tiết thanh toán', 'Xem lại đơn hàng'];

function getStepContent(
  step: number,
  // address: Address,
  // payment: string,
  code: string,
  onAddressUpdate: (newAddress: Address) => void,
  onPaymentUpdate: (newPayment: string) => void,
  onVoucherUpdated: (code: string, hasError?: boolean) => void,
  onAddressValidationChange: (isValid: boolean) => void
) {
  console.log(code);
  switch (step) {
    case 0:
      return (
        <AddressForm
          onAddressUpdate={onAddressUpdate}
          onValidationChange={onAddressValidationChange}
        />
      );
    case 1:
      return <PaymentForm onPaymentUpdate={onPaymentUpdate} />;
    case 2:
      return (
        <Review
          // address={address}
          // payment_method={payment}
          onVoucherUpdated={onVoucherUpdated}
        />
      );
    default:
      throw new Error('Bước không xác định');
  }
}

export default function Checkout() {
  const totalPrice = useSelector(selectCartTotalPrice);
  const items = useSelector(selectCartItems);
  const [address, setAddress] = React.useState<Address | null>(null);
  const [payment_method, setPayment] = React.useState<string | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const [code, setCode] = React.useState<string>('');
  const [voucherError, setVoucherError] = React.useState<boolean>(false);
  const [isAddressValid, setIsAddressValid] = React.useState<boolean>(false);
  const [idOrder, setIdOrder] = React.useState<string>('');

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');

  const dispatch = useDispatch();
  const profile = useSelector((state:RootState) => state.profile);

  React.useEffect(() => {
    if (!profile.fullname) {
      window.location.href = '/auth/login';
    }
  }, [profile]);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!isAddressValid) {
        setSnackbarOpen(false);
        setTimeout(() => {
          setSnackbarMessage(`Vui lòng nhập địa chỉ đầy đủ và chính xác!`);
          setSnackbarSeverity('warning');
          setSnackbarOpen(true);
        }, 0);
        return;
      }
    }

    if (activeStep === 1) {
      if (!payment_method) {
        setSnackbarOpen(false);
        setTimeout(() => {
          setSnackbarMessage(`Vui lòng nhập thông tin thanh toán!`);
          setSnackbarSeverity('warning');
          setSnackbarOpen(true);
        }, 0);
        return;
      }
    }

    if (activeStep === steps.length - 1) {
      handleOrderSubmit();
      return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleOrderSubmit = async () => {
    const formattedItems = items.map(
      ({ _id, selectedSize, quantity, price }) => ({
        menu_id: _id!,
        quantity,
        price: price!,
        variant_size: selectedSize || null,
      })
    );

    const orderData = {
      orderItems: formattedItems,
      shipping_address: address!,
      payment_method_id: payment_method!,
      code: code || '',
    };

    try {
      const response = await createOrderInfo(orderData);
      console.log('Order created successfully:', response);
      setIdOrder(response?.order?.order_id);
      if (!response.order_url) {
        setActiveStep(activeStep + 1);
      }
      dispatch(clearCart());
    } catch (error) {
      console.error('Order creation failed:', error);
      alert('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.');
    }
  };

  const onAddressUpdate = (newAddress: Address) => {
    setAddress(newAddress);
  };

  const onAddressValidationChange = (isValid: boolean) => {
    setIsAddressValid(isValid);
  };

  const onPaymentUpdate = (newPayment: string) => {
    setPayment(newPayment);
  };

  const handleVoucherUpdate = (newCode: string, hasError: boolean = false) => {
    setCode(newCode);
    setVoucherError(hasError);
  };

  return (
    <section className="">
      <div className="container">
        <div className="row text-dark">
          <AppTheme>
            <CssBaseline enableColorScheme />
            <Box
              sx={{
                minHeight: '100vh',
                pb: { xs: '100px', sm: '0.1px' },
                position: 'relative',
                width: '100%',
              }}
            >
              <Grid
                container
                sx={{
                  minHeight: 'calc(100vh - 400px)',
                  mt: { xs: 4, sm: 0 },
                  width: '100%',
                }}
              >
                <Grid
                  size={{ xs: 12, sm: 5, lg: 4 }}
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    flexDirection: 'column',
                    backgroundColor: '',
                    borderRight: { sm: 'none', md: '1px solid' },
                    borderColor: { sm: 'none', md: 'divider' },
                    alignItems: 'start',
                    px: 10,
                    gap: 4,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                      width: '100%',
                      maxWidth: 500,
                    }}
                  >
                    <Info />
                  </Box>
                </Grid>

                <Grid
                  size={{ sm: 12, md: 7, lg: 8 }}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: '100%',
                    width: '100%',
                    backgroundColor: { xs: 'transparent', sm: '' },
                    alignItems: 'start',
                    px: { xs: 2, sm: 10 },
                    gap: { xs: 4, md: 8 },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { sm: 'space-between', md: 'flex-end' },
                      alignItems: 'center',
                      width: '100%',
                      maxWidth: { sm: '100%', md: 600 },
                    }}
                  >
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'flex' },
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flexGrow: 1,
                      }}
                    >
                      <Stepper
                        id="desktop-stepper"
                        activeStep={activeStep}
                        sx={{ width: '100%', height: 40 }}
                      >
                        {steps.map((label, index) => (
                          <Step
                            key={label}
                            active={activeStep === index}
                            completed={activeStep > index}
                            sx={{
                              ':first-of-type': { pl: 0 },
                              ':last-of-type': { pr: 0 },
                            }}
                          >
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </Box>

                  <Card
                    sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}
                  >
                    <CardContent
                      sx={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <Typography variant="subtitle2" gutterBottom>
                          Thành tiền
                        </Typography>
                        <Typography variant="body1">
                          {formatPrice(totalPrice)} VNĐ
                        </Typography>
                      </div>
                      <InfoMobile />
                    </CardContent>
                  </Card>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                      width: '100%',
                      maxWidth: { sm: '100%', md: 600 },
                      gap: { xs: 5, md: 'none' },
                      mb: 4, // Thêm margin dưới
                    }}
                  >
                    <Stepper
                      id="mobile-stepper"
                      activeStep={activeStep}
                      alternativeLabel
                      sx={{ display: { sm: 'flex', md: 'none' } }}
                    >
                      {steps.map((label) => (
                        <Step
                          sx={{
                            ':first-child': { pl: 0 },
                            ':last-child': { pr: 0 },
                            '& .MuiStepConnector-root': {
                              top: { xs: 6, sm: 12 },
                            },
                          }}
                          key={label}
                        >
                          <StepLabel
                            sx={{
                              '.MuiStepLabel-labelContainer': {
                                maxWidth: '70px',
                              },
                            }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    {activeStep === steps.length ? (
                      <>
                        <CheckoutSuccessPage idOrder={idOrder} />
                      </>
                    ) : (
                      <>
                        {getStepContent(
                          activeStep,
                          // address,
                          // payment_method,
                          code,
                          onAddressUpdate,
                          onPaymentUpdate,
                          handleVoucherUpdate,
                          onAddressValidationChange
                        )}
                      </>
                    )}
                    {activeStep !== steps.length && (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Button
                          className="btn-product2"
                          onClick={handleBack}
                          disabled={activeStep === 0}
                          sx={{ width: '45%', height: 48 }}
                        >
                          <ChevronLeftRoundedIcon sx={{ mr: 1 }} />
                          Quay lại
                        </Button>
                        {activeStep === steps.length - 1 ? (
                          <Button
                            className="btn-product"
                            onClick={() => {
                              if (voucherError) {
                                setSnackbarOpen(false);
                                setTimeout(() => {
                                  setSnackbarMessage(`Voucher không khả dụng!`);
                                  setSnackbarSeverity('warning');
                                  setSnackbarOpen(true);
                                }, 0);
                              } else {
                                handleOrderSubmit();
                              }
                            }}
                            sx={{ width: '45%', height: 48 }}
                          >
                            Đặt hàng
                          </Button>
                        ) : (
                          <Button
                            className="btn-product"
                            onClick={handleNext}
                            sx={{ width: '45%', height: 48 }}
                          >
                            Tiếp theo
                            <ChevronRightRoundedIcon sx={{ ml: 1 }} />
                          </Button>
                        )}
                      </Box>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </AppTheme>
        </div>
      </div>
      <SnackbarNotification
        snackbarOpen={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        snackbarOnclose={() => setSnackbarOpen(false)}
      />
    </section>
  );
}
