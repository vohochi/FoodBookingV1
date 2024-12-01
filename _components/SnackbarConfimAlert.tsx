import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface ConfimAlertProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export const ConfimAlert: React.FC<ConfimAlertProps> = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{backgroundColor:'#1a285e', color:'#fff'}}>{title}</DialogTitle>
            <DialogContent sx={{mt:2}}>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} className='btn-product'>
                    Hủy
                </Button>
                <Button onClick={onConfirm} className='btn-product2'>
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
};
