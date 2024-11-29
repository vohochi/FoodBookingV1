import {
    fetchData,
} from '@/_lib/data-services';
import { FetchVouchersResponse } from '@/types/Voucher';

export const fetchVouchers = async ():Promise<FetchVouchersResponse> => {
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