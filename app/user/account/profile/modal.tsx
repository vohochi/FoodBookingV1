import React from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
    Grid,
    Box,
    Typography,
    Divider, // Import Divider
} from "@mui/material";
import Image from "next/image";

const OrderModal = ({ isOpen, onClose, productData }) => {
    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md" data-aos="fade-up">
            <DialogTitle style={{ background: '#0c0b09', borderBottom:'1px solid #cde45a' }}>
                <Typography variant="h6" style={{ color: '#cda45e' }}>{productData.orderNumber}</Typography>
            </DialogTitle>
            <DialogContent className='hidden-scroll section-bg text-white py-4' >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {productData.products.map((product, index) => (
                            <React.Fragment key={index}>
                                <Grid container spacing={2} alignItems="center" mb={2}>
                                    <Grid item xs={3}>
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={70}
                                            height={70}
                                            style={{ borderRadius: '8px', objectFit: 'cover', height: 'auto' }}
                                        />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Typography variant="body1" fontWeight="bold">
                                            {product.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} textAlign="center">
                                        <Typography variant="body1">
                                            x{product.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} textAlign="right">
                                        <Typography variant="body1" fontWeight="bold">
                                            {product.price} VND
                                        </Typography>
                                    </Grid>

                                </Grid>
                                {index < productData.products.length - 1 && (
                                    <Divider style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', marginBottom: '18px' }} />
                                )}
                            </React.Fragment>
                        ))}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions style={{ background: '#0c0b09', borderTop:'1px solid #cde45a' }}>
                <Grid container>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Typography variant="h6" align="right" style={{ color: '#cda45e' }}>
                            Tổng cộng: {productData.total} VND
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div onClick={onClose} className="btn btn-secondary">
                            Đóng
                        </div>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default OrderModal;
