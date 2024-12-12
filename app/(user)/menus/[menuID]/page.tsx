import FoodDetailPage from '@/_components/FoodDetailPage';
import Spinner from '@/_components/Spinner';
import { Suspense } from 'react';
import { getDishById, getDishes } from '@/_lib/menus'; // Import phương thức lấy món ăn
import UnderNavigation from '@/_components/UnderNavigation';
import '@/app/_styles/globals.css';

export const metadata = {
  title: 'Chi tiết món ăn | FoodBooking',
  description:
    'Khám phá chi tiết món ăn hấp dẫn của FoodBooking, từ nguyên liệu, cách chế biến đến hình ảnh đẹp mắt. Đặt món ngay hôm nay để trải nghiệm hương vị tuyệt vời!',
  keywords:
    'FoodBooking, Thức ăn, đặt món, đặt món online, giao hàng, nhà hàng, ẩm thực, Việt Nam, FoodBooking',
};
// Lấy thông tin món ăn để tạo tiêu đề
export async function generateMetadata({
  params,
}: {
  params: { menuID: string };
}) {
  const food = await getDishById(params.menuID);
  return { title: `Food ${food.name}` };
}

// Tạo params tĩnh từ mảng món ăn
export async function generateStaticParams() {
  const menus = await getDishes();
  const ids = menus.map((food) => ({ menuID: String(food._id) }));
  console.log(ids);
  return ids;
}

export default async function Page({ params }: { params: { menuID: string } }) {
  const food = await getDishById(params.menuID); // Lấy thông tin món ăn bằng getDishById

  return (
    <>
      <UnderNavigation />
      <main id="main">
        <Suspense fallback={<Spinner />}>
          <FoodDetailPage food={food} />
        </Suspense>
      </main>
    </>
  );
}
