import {
  IconUsers,
  IconFile,
  IconCategory,
  IconShoppingCart,
  IconMenu2,
  IconHome,
  IconComet, // Thêm icon comment cho phần Reviews
  IconTag, // Icon cho Vouchers
} from '@tabler/icons-react';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconHome, // IconHome đại diện cho trang dashboard chính.
    href: '/admin',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Menus',
    icon: IconMenu2, // IconMenu2 đại diện cho danh sách các món ăn.
    href: '/admin/utilities/menus',
  },
  {
    id: uniqueId(),
    title: 'Categories',
    icon: IconCategory, // IconCategory đại diện cho các danh mục sản phẩm.
    href: '/admin/utilities/categories',
  },

  {
    id: uniqueId(),
    title: 'Orders',
    icon: IconShoppingCart, // IconShoppingCart đại diện cho các đơn hàng.
    href: '/admin/utilities/orders',
  },

  {
    id: uniqueId(),
    title: 'Customers',
    icon: IconUsers, // IconUsers phù hợp để quản lý dữ liệu khách hàng.
    href: '/admin/utilities/customers',
  },
  {
    id: uniqueId(),
    title: 'Vouchers',
    icon: IconTag, // IconTag phù hợp để đại diện cho Vouchers.
    href: '/admin/utilities/vouchers',
  },

  {
    id: uniqueId(),
    title: 'Reviews',
    icon: IconComet, // IconComment phù hợp để đại diện cho đánh giá.
    href: '/admin/utilities/reviews',
  },

  {
    navlabel: true,
    subheader: 'Extra',
  },

  {
    id: uniqueId(),
    title: 'other...',
    icon: IconFile, // IconFile đại diện cho một tài liệu hoặc trang mẫu.
    href: '/sample-page',
  },
];

export default Menuitems;
