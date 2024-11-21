import {
  IconUsers,
  IconFile,
  IconCategory,
  IconShoppingCart,
  IconMenu2,
  IconHome,
  IconComet, // Thêm icon comment cho phần Reviews
  IconTag,
  IconChecklist, // Icon cho Vouchers
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Trang Chủ',
  },
  {
    id: uniqueId(),
    title: 'Bảng Điều Khiển',
    icon: IconHome, // IconHome đại diện cho trang dashboard chính.
    href: '/admin',
  },
  {
    navlabel: true,
    subheader: 'Tiện Ích',
  },
  {
    id: uniqueId(),
    title: 'Thực Đơn',
    icon: IconMenu2, // IconMenu2 đại diện cho danh sách các món ăn.
    href: '/admin/utilities/menus',
  },
  {
    id: uniqueId(),
    title: 'Danh Mục',
    icon: IconCategory, // IconCategory đại diện cho các danh mục sản phẩm.
    href: '/admin/utilities/categories',
  },
  {
    id: uniqueId(),
    title: 'Đơn Hàng',
    icon: IconShoppingCart, // IconShoppingCart đại diện cho các đơn hàng.
    href: '/admin/utilities/orders',
  },
  {
    id: uniqueId(),
    title: 'Khách Hàng',
    icon: IconUsers, // IconUsers phù hợp để quản lý dữ liệu khách hàng.
    href: '/admin/utilities/customers',
  },
  {
    id: uniqueId(),
    title: 'Phiếu Giảm Giá',
    icon: IconTag, // IconTag phù hợp để đại diện cho Vouchers.
    href: '/admin/utilities/vouchers',
  },
  {
    id: uniqueId(),
    title: 'Phương thức thanh toán',
    icon: IconChecklist, // IconComment phù hợp để đại diện cho đánh giá.
    href: '/admin/utilities/methodPayment',
  },
  {
    id: uniqueId(),
    title: 'Đánh Giá',
    icon: IconComet, // IconComment phù hợp để đại diện cho đánh giá.
    href: '/admin/utilities/reviews',
  },
  {
    navlabel: true,
    subheader: 'Khác',
  },
  {
    id: uniqueId(),
    title: 'Khác...',
    icon: IconFile, // IconFile đại diện cho một tài liệu hoặc trang mẫu.
    href: '/sample-page',
  },
];

export default Menuitems;
