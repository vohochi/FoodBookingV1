'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
} from '@mui/material';
import BtnFavorite from './BtnFavourite';
import { Menu } from '@/types/Menu';
import { FaStar } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slice/cartSlice';
import { RootState } from '@/store';
import { CartItem } from '@/store/cartMiddleware';
import Cookies from 'js-cookie';

interface FoodDetailModalProps {
    open: boolean;
    food: Menu;
    quantity: number | null;
    onClose: () => void;
    onSubmit: (quantity: number) => void;
}

const FoodDetailModal = ({
    open,
    food,
    quantity,
    onClose,
    onSubmit,
}: FoodDetailModalProps) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.items || []);
    const [formData, setFormData] = useState({ quantity: quantity || 1 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'quantity') {
            const quantity = parseInt(value, 10);
            if (quantity > 0) {
                setFormData({ ...formData, [name]: quantity });
            }
        }
    };
    const updateCookiesCart = (updatedCart: CartItem[]) => {
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 }); // Set cookie with 7 days expiration
    };

    const handleAddToCart = (food: Menu) => {
        const item = {
            ...food,
            quantity: formData.quantity !== null ? formData.quantity : 1, // Thay thế null bằng 1
        };

        dispatch(addToCart(item)); // Gửi item đến Redux
        const updatedCart = [...cart, item]; // Cập nhật giỏ hàng
        updateCookiesCart(updatedCart); // Cập nhật giỏ hàng trong cookies
        alert(`${food.name} đã được thêm vào giỏ hàng!`); // Thông báo
    };


    useEffect(() => {
        // Retrieve cart from cookies on component mount
        const savedCart = Cookies.get('cart')
            ? JSON.parse(Cookies.get('cart')!)
            : [];
        console.log('Giỏ hàng hiện tại:', savedCart);
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData.quantity);
        onClose();
    };
    if (!food) return null;
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent
                className="hidden-scroll"
                style={{
                    padding: '20px',
                    border: '1px solid gray',
                    color: '#1a285a',
                }}
            >
                <Grid container spacing={2} className="container" data-aos="fade-up" style={{ marginBottom: '20px' }}>
                    <Grid item xs={12} sm={5}>
                        <div data-aos="zoom-in" data-aos-delay={50} className="mx-auto">
                            <div className="img-hover-zoom">
                                <Image
                                    src={`http://localhost:3002/images/${food.image}`}
                                    alt={food.name}
                                    className="mx-auto bg-transparent "
                                    width={400}
                                    height={400}
                                    objectFit="cover"
                                    style={{
                                        borderRadius: '8px',
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <DialogContentText style={{ color: '#1a285a' }}>
                            <h2>{food.name}</h2>

                        </DialogContentText>

                        <Box display="flex" flexDirection="column" height="100%">
                            <DialogContentText>
                                <h3
                                    style={{
                                        color: '#1a285a',
                                        fontSize: '30px',
                                        marginBottom: '15px',
                                    }}
                                >
                                    {food.price}
                                </h3>
                            </DialogContentText>
                            <DialogContentText>
                                <div className="">
                                    {/* Render stars */}
                                    {[...Array(5)].map((_, index) => (
                                        <FaStar
                                            key={index}
                                            style={{ color: '#f0e68c', fontSize: '14px', marginBottom: '20px', }}
                                        />
                                    ))}
                                </div>
                            </DialogContentText>
                            <DialogContentText>
                                <p style={{ color: '#101010' }}>Một chút mô tả</p>
                            </DialogContentText>
                            <DialogContentText style={{ marginBottom: '20px' }}>
                                {food.description}
                            </DialogContentText>

                            <form onSubmit={handleSubmit} style={{ flexGrow: 1 }}>
                                <DialogContentText>
                                    <p style={{ color: '#101010' }}>Nhập số lượng bạn muốn order</p>
                                </DialogContentText>

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginTop: '20px',
                                        border: '1px solid #1a285a',
                                        maxWidth: 'fit-content',
                                        borderRadius: '50px',
                                    }}
                                >
                                    <div
                                        className="btn-custom-plusminus"
                                        onClick={() => {
                                            const newQuantity = Math.max(1, formData.quantity - 1);
                                            setFormData({ ...formData, quantity: newQuantity }); 
                                        }}
                                    >
                                        <i className="fa fa-minus"></i>
                                    </div>


                                    <TextField
                                        margin="dense"
                                        name="quantity"
                                        type="number"
                                        onChange={handleChange}
                                        value={formData.quantity}
                                        InputProps={{
                                            inputProps: { style: { textAlign: 'center' }, readOnly: true },
                                            sx: { height: '30px' },
                                        }}
                                        style={{
                                            width: '80px',
                                            textAlign: 'center',
                                            borderLeft: '1px solid rgba(26, 40, 90, 0.3)',
                                            borderRight: '1px solid rgba(26, 40, 90, 0.3)',
                                        }}
                                        sx={{
                                            '& input[type=number]': {
                                                MozAppearance: 'textfield',
                                                color: '#1a285a',
                                            },
                                            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                                WebkitAppearance: 'none',
                                                margin: 0,
                                            },
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': { border: 'none' },
                                                '&:hover fieldset': { border: 'none' },
                                                '&.Mui-focused fieldset': { border: 'none' },
                                            },
                                        }}
                                    />

                                    <div
                                        className="text-center btn-custom-plusminus"
                                        onClick={() => {
                                            const newQuantity = formData.quantity + 1; // Tăng số lượng
                                            setFormData({ ...formData, quantity: newQuantity }); // Cập nhật số lượng mới
                                        }}
                                    >
                                        <i className="fa fa-plus"></i>
                                    </div>
                                </div>
                                <DialogActions style={{ justifyContent: 'start', marginTop: '20px', padding: '0' }}>
                                    <Button type="submit" className="btn btn-product" onClick={() => handleAddToCart(food)}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <BtnFavorite />
                                </DialogActions>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default FoodDetailModal;
