import * as React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Divider,
  Stack,
  Rating,
  Chip,
} from '@mui/material';
import {
  Close,
  RestaurantMenu,
  AccessTime,
  LocalOffer,
  Category as CategoryIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import { formatPrice } from '@/utils/priceVN';
import { Menu } from '@/types/Menu';

interface MenuDetailModalProps {
  open: boolean;
  onClose: () => void;
  menu: Menu | null;
}

export default function MenuDetailModal({
  open,
  onClose,
  menu,
}: MenuDetailModalProps) {
  if (!menu) return null;

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="menu-detail-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: 900 },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <RestaurantMenu />
            <Typography variant="h6">Chi tiết món ăn</Typography>
          </Stack>
          <IconButton onClick={onClose} sx={{ color: 'inherit' }}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ p: 3, maxHeight: 'calc(90vh - 64px)', overflowY: 'auto' }}>
          <Grid container spacing={3}>
            {/* Left side - Image */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  height: '100%',
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: 400,
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={`${menu.img}`}
                    alt={menu.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              </Paper>
            </Grid>

            {/* Right side - Details */}
            <Grid item xs={12} md={7}>
              <Stack spacing={3}>
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {menu.name}
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Rating value={3} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      (4.5 / 5)
                    </Typography>
                  </Stack>
                </Box>

                <Box>
                  {menu.variant && menu.variant.length > 0 ? (
                    <Typography variant="h5" color="primary" gutterBottom>
                      {` ${formatPrice(
                        Math.min(...menu.variant.map((v) => v.price))
                      )}`}
                    </Typography>
                  ) : (
                    menu.price && (
                      <Typography variant="h5" color="primary" gutterBottom>
                        {formatPrice(menu.price)}
                      </Typography>
                    )
                  )}

                  {/* Optional: Show available variants */}

                  <Chip
                    icon={<LocalOffer />}
                    label={menu.quantity ? 'Còn hàng' : 'Hết hàng'}
                    color={menu.quantity ? 'success' : 'error'}
                    variant="outlined"
                  />
                </Box>
                <p>Số lượng: {menu?.quantity}</p>
                <Divider />

                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Mô tả món ăn
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {menu.description || 'Chưa có mô tả cho món ăn này'}
                  </Typography>
                </Box>

                {/* Variants List */}
                {menu.variant && menu.variant.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Kích cỡ và giá:
                      {menu.variant.map((v) => v.size).join(', ')}
                    </Typography>

                    <Stack spacing={1}>
                      {/* Uncomment if you have variant logic */}
                      {/* {menu.variant.map((variant, index) => (
                        <Chip
                          key={index}
                          label={`${variant.size} - ${formatPrice(
                            variant.price
                          )}`}
                          variant="outlined"
                        />
                      ))} */}
                    </Stack>
                  </Box>
                )}

                <Divider />

                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          height: '100%',
                        }}
                      >
                        <Stack spacing={1}>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <CategoryIcon color="action" />
                            <Typography variant="subtitle2">
                              Danh mục
                            </Typography>
                          </Stack>
                          <Typography color="text.secondary">
                            {typeof menu.category === 'object' &&
                            menu.category?.name
                              ? menu.category.name
                              : 'Chưa phân loại'}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          height: '100%',
                        }}
                      >
                        <Stack spacing={1}>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <AccessTime color="action" />
                            <Typography variant="subtitle2">
                              Thời gian cập nhật
                            </Typography>
                          </Stack>
                          <Typography color="text.secondary">
                            {menu.updateAt
                              ? new Date(menu.updateAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })
                              : '25/10/2024'}
                          </Typography>
                        </Stack>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}
