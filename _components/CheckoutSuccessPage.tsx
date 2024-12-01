import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export const CheckoutSuccessPage = ({ idOrder }: { idOrder: string }) => {
    return (
        <Stack spacing={4} useFlexGap>
            <Typography variant="h1">📦</Typography>
            <Typography variant="h5">Cảm ơn bạn đã đặt hàng!</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Mã đơn hàng của bạn là
                <strong> {idOrder}</strong>. Chúng tôi đã gửi email xác
                nhận đơn hàng và sẽ cập nhật cho bạn khi đơn hàng được giao.
            </Typography>
            <Link href="account/profile" passHref>
                <Button
                    sx={{ width: '100%', height: '48px' }}
                    className="btn-product"
                >
                    Xem lại đơn hàng
                </Button>
            </Link>
        </Stack>
    );
};
