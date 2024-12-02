import { useEffect, useState } from 'react';
import {
  CardActionArea,
  CardContent,
  FormControl,
  RadioGroup,
  Stack,
  styled,
  Typography,
  Card as MuiCard,
  Box,
} from '@mui/material';
import { fetchPaymentMethods } from '@/_lib/payment_methods';
// import { Payment_method } from '@/types/payment_methods';
import { IPaymentMethod } from '@/types/PaymentMethod';

export default function PaymentForm({
  onPaymentUpdate,
}: {
  onPaymentUpdate: (paymentId: string) => void;
}) {
  const [paymentId, setPaymentId] = useState('');
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([]);

  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const { data } = await fetchPaymentMethods();

        setPaymentMethods(data.paymentMethods || []);
        const defaultPaymentMethod = data.paymentMethods[0];
        if (defaultPaymentMethod) {
          setPaymentId(defaultPaymentMethod._id);
          onPaymentUpdate(defaultPaymentMethod._id);
        }
      } catch (error) {
        console.error('Error loading payment methods:', error);
      }
    };

    loadPaymentMethods();
  }, []);

  const handlePaymentChange = (newPaymentId: string) => {
    setPaymentId(newPaymentId);
    onPaymentUpdate(newPaymentId);
  };

  const Card = styled(MuiCard)<{ selected?: boolean }>(
    ({ theme, selected }) => ({
      border: '1px solid',
      borderColor: selected
        ? theme.palette.primary.main
        : theme.palette.divider,
      width: '100%',
      '&:hover': {
        background:
          'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
        borderColor: theme.palette.primary.light,
        boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
      },
    })
  );

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <FormControl component="fieldset" fullWidth>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '24px',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Vui lòng chọn hình thức thanh toán!
        </Typography>
        <RadioGroup
          aria-label="Payment options"
          name="paymentType"
          value={paymentId} // Sử dụng paymentId thay vì paymentType
          onChange={(e) => handlePaymentChange(e.target.value)}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          {paymentMethods.map((method) => (
            <Card key={method._id} selected={paymentId === method._id}>
              {' '}
              {/* So sánh với _id */}
              <CardActionArea
                onClick={() => handlePaymentChange(method._id)}
                sx={{
                  '.MuiCardActionArea-focusHighlight': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus-visible': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <CardContent
                  sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  <Box
                    component="img"
                    src={`${method.img}`}
                    alt={method.name}
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: paymentId === method._id ? '2px solid' : 'none',
                      borderColor:
                        paymentId === method._id
                          ? 'primary.main'
                          : 'transparent',
                      transition: 'border-color 0.3s',
                    }}
                  />
                  <Typography sx={{ fontWeight: 'medium' }}>
                    {method.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
