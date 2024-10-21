import FoodDetailPage from '@/_components/FoodDetailPage';
import Spinner from '@/_components/Spinner';
import { Suspense } from 'react';
import { getDishById, getDishes } from '@/_lib/dishes'; // Import phương thức lấy món ăn
import UnderNavigation from '@/_components/UnderNavigation';

export async function generateMetadata({ params }) {
  // Lấy thông tin món ăn để tạo tiêu đề
  const food = await getDishById(params.menuID);
  return { title: `Food ${food.name}` };
}

export async function generateStaticParams() {
  const { dishes } = await getDishes();
  const ids = dishes.map((food) => ({ menuID: String(food._id) })); // Tạo params từ mảng
  return ids;
}

export default async function Page({ params }) {
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
