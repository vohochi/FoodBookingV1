import {
    fetchData,
    postData,
} from '@/_lib/data-services';
import { FetchVouchersResponse } from '@/types/Voucher';

export const fetchVouchers = async (): Promise<FetchVouchersResponse> => {
    try {
        const response = await fetchData(
            '/api/vouchers'
        );
        return response as FetchVouchersResponse;
    } catch (error) {
        console.error('Error fetching vouchers:', error);
        throw new Error('Data could not be loaded');
    }
};

export const applyVoucher = async (code: string, orderTotal: number) => {
    try {
        const response = await postData(
            `/api/vouchers/apply`
            , { code, orderTotal });
        return response as FetchVouchersResponse;

    } catch (error: unknown) {
        console.error('Error applying voucher:', error);
    }
};