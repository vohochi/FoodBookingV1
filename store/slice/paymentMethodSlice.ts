import { Payment_method } from '@/types/payment_methods';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:Payment_method = {
    name:'',
    type:'',
    description:'',
    status:'',
    img:'',
}

const paymentMethodSlice = createSlice ({
    name: 'paymentMethod',
    initialState,
    reducers: {
        setPaymentMethod: (state, action: PayloadAction<Payment_method>) => {
            state.name = action.payload.name;
            state.type = action.payload.type;
            state.description = action.payload.description;
            state.status = action.payload.status;
            state.img = action.payload.img;
        }
    }
})

export const { setPaymentMethod } = paymentMethodSlice.actions;

export default paymentMethodSlice;