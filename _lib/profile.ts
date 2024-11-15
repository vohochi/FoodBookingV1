
import {
  fetchData,
  postData,
  updateData
} from '@/_lib/data-services';
import { Address, ProfileState } from '@/store/slice/profileSlice';

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

export const updateUserAddress = async (updatedAddresses: Address[]): Promise<UpdateProfileResponse> => {
  try {
    const formData = new FormData();
    formData.append('receiver', updatedAddresses.receiver);
    formData.append('phone', updatedAddresses.phone);
    formData.append('address', updatedAddresses.address);

    // updatedAddresses.forEach((addressItem, index) => {
    //   formData.append(`address[${index}][receiver]`, addressItem.receiver);
    //   formData.append(`address[${index}][phone]`, addressItem.phone);
    //   formData.append(`address[${index}][address]`, addressItem.address);
    // });
    console.log(updatedAddresses);

    const response = await postData('/api/users/address', formData);
    if (response) {
      return { message: 'Address updated successfully' };
    } else {
      throw new Error('Failed to update address');
    }
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Failed to update address');
  }
};


export const logout = async () => {
  try {
    const response = await fetchData('/api/auth/logout');
    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Failed to log out');
  }
};