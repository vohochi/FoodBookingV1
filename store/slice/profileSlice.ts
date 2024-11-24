import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Address {
    receiver: string;
    phone: string;
    address: string;
}

export interface ProfileState {
    fullname: string;
    email: string;
    avatar: string | File;
    address: Address;
    role: string;
    isVerified: boolean;
}

const initialState: ProfileState = {
    fullname: "",
    email: "",
    avatar: "",
    address: { receiver: "", phone: "", address: "" },
    role: "",
    isVerified: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileState>) => {
            state.fullname = action.payload.fullname;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.address = action.payload.address;
            state.role = action.payload.role;
            state.isVerified = action.payload.isVerified;
        },

        clearProfile: (state) => {
            state.fullname = "";
            state.email = "";
            state.avatar = "";
            state.address = { receiver: "", phone: "", address: "" };
            state.role = "";
            state.isVerified = false;
        },
    },
});

export const { setProfile, clearProfile } = profileSlice.actions;
export default profileSlice;
