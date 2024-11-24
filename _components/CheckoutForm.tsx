'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
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
import Link from 'next/link';

import { selectCartTotalPrice } from '@/store/selector/cartSelectors';

import { formatPrice } from '@/utils/priceVN';
import { useSelector } from 'react-redux';

const steps = ['Địa chỉ giao hàng', 'Chi tiết thanh toán', 'Xem lại đơn hàng'];

function getStepContent(
  step: number,
  address: any,
  payment: any,
  onAddressUpdate: (newAddress: any) => void,
  onPaymentUpdate: (newPayment: any) => void
) {
  switch (step) {
    case 0:
      return <AddressForm onAddressUpdate={onAddressUpdate} />;
    case 1:
      return <PaymentForm onPaymentUpdate={onPaymentUpdate} />;
    case 2:
      return <Review address={address} payment={payment} />;
    default:
      throw new Error('Bước không xác định');
  }
}

export default function Checkout(props: { disableCustomTheme?: boolean }) {
  const totalPrice = useSelector(selectCartTotalPrice);
  const [address, setAddress] = React.useState(null); // Lưu địa chỉ
  const [payment, setPayment] = React.useState(null); // Lưu thông tin thanh toán
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!address) {
        alert("Vui lòng nhập địa chỉ đầy đủ!");
        return;
      }
    }

    if (activeStep === 1) {
      if (!payment) {
        alert("Vui lòng nhập thông tin thanh toán!");
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

  const handleOrderSubmit = () => {
    // Gửi dữ liệu đơn hàng qua API hoặc xử lý việc đặt hàng tại đây
    console.log('Order submitted:', { address, payment, totalPrice });
    alert('Đặt hàng thành công! Chúng tôi sẽ gửi thông báo qua email.');
    setActiveStep(activeStep + 1); // Chuyển sang bước cuối
  };

  const onAddressUpdate = (newAddress: any) => {
    setAddress(newAddress);  // Cập nhật địa chỉ
  };

  const onPaymentUpdate = (newPayment: any) => {
    setPayment(newPayment);
  };

  return (
    <section className="">
      <div className="container">
        <div className="row text-dark">
          <AppTheme {...props}>
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

                  <Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
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
                      <InfoMobile
                        totalPrice={totalPrice}
                      />
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
                            '& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
                          }}
                          key={label}
                        >
                          <StepLabel
                            sx={{
                              '.MuiStepLabel-labelContainer': { maxWidth: '70px' },
                            }}
                          >
                            {label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    {activeStep === steps.length ? (
                      <Stack spacing={4} useFlexGap>
                        <Typography variant="h1">📦</Typography>
                        <Typography variant="h5">Cảm ơn bạn đã đặt hàng!</Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                          Mã đơn hàng của bạn là
                          <strong>&nbsp;#140396</strong>. Chúng tôi đã gửi email xác
                          nhận đơn hàng và sẽ cập nhật cho bạn khi đơn hàng được giao.
                        </Typography>
                        <Button
                          sx={{ width: '100%', height: '48px' }}
                          variant="contained"
                          color="primary"
                        >
                          <Link href="/orders">Xem lại đơn hàng</Link>
                        </Button>
                      </Stack>
                    ) : (
                      <>
                        {getStepContent(
                          activeStep,
                          address,
                          payment,
                          onAddressUpdate,
                          onPaymentUpdate
                        )}
                      </>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button
                        color="primary"
                        variant="outlined"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ width: '45%', height: 48 }}
                      >
                        <ChevronLeftRoundedIcon sx={{ mr: 1 }} />
                        Quay lại
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={handleNext}
                        sx={{ width: '45%', height: 48 }}
                      >
                        Tiếp theo
                        <ChevronRightRoundedIcon sx={{ ml: 1 }} />
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </AppTheme>
        </div>
      </div>
    </section>
  );
}
