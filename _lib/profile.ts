
import {
  deleteData,
  fetchData,
  postData,
  updateData
} from '@/_lib/data-services';
import { Address, ProfileState } from '@/store/slice/profileSlice';
import axios from 'axios';

export const fetchUserProfile = async () => {
  try {
    const response = await fetchData(
      `/api/users/profile`
    );
    return response;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Data could not be loaded');
  }
};

interface UpdateProfileResponse {
  message: string;
}
export const updateUserProfile = async (updatedProfile: ProfileState): Promise<UpdateProfileResponse> => {
  try {
    const formData = new FormData();

    if (updatedProfile.fullname) {
      formData.append('fullname', updatedProfile.fullname);
    }
    if (updatedProfile.email) {
      formData.append('email', updatedProfile.email);
    }

    if (updatedProfile.avatar) {
      formData.append('avatar', updatedProfile.avatar);
    }

    const response = await updateData('/api/users/profile', formData);
    if (response) {
      return { message: 'Profile updated successfully' };
    } else {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
};
export const updateUserAddress = async (addresses: Address[]) => {
  try {
    if (addresses.length === 0) {
      throw new Error('No address data provided');
    }

    const results = [];

    for (const addressData of addresses) {
      const payload = {
        receiver: addressData.receiver,
        phone: addressData.phone,
        address: addressData.address,
      };

      try {
        // If address has _id, update it
        if (addressData._id) {
          const response = await updateData(`/api/users/address/${addressData._id}`, payload);

          if (response.success) {
            results.push({
              ...addressData,
              _id: addressData._id
            });
            console.log('Address updated with _id:', addressData._id);
          }
        } else {
          // If no _id, create new address
          const response = await postData('/api/users/address', payload);

          if (response.success) {
            results.push({
              ...addressData,
              _id: response.data._id
            });
            console.log('Address created with _id:', response.data._id);
          }
        }
      } catch (error) {
        console.error('Error processing address:', error);
        throw error;
      }
    }

    return {
      success: true,
      message: 'Address updated successfully',
      addresses: results
    };
  } catch (error) {
    console.error('Error managing addresses:', error);
    throw error;
  }
};
export const removeUserAddress = async (addressId: string) => {
  try {
    const response = await deleteData(`/api/users/address/${addressId}`);

    if (!response.success) {
      throw new Error(response.message || 'Failed to remove address');
    }

    return response;
  } catch (error) {
    console.error('Error removing address:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      'https://foodbookingapi.onrender.com/api/auth/logout',
    );
    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Failed to log out');
  }
};