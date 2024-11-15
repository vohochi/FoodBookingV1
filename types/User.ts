export interface IUser {
  _id?: string;
  id?: number;
  fullname?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: {        
    receiver: string;
    phone: string;
    address: string;
  }[];
  role?: 'user' | 'admin';  
  updatedAt?: Date;
  is_locked?: boolean;
  avatar?: string;
  isVerified?: boolean;  // Thêm trường isVerified
  verificationCode?: number;  // Thêm trường verificationCode
  verificationCodeExpires?: Date;  // Thêm trường verificationCodeExpires
  resetPasswordToken?: string;  // Thêm trường resetPasswordToken
  resetPasswordExpires?: Date;  // Thêm trường resetPasswordExpires
}
