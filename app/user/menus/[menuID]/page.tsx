import FoodDetailPage from '@/app/_components/FoodDetailPage';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';
import { getDishById, getDishes } from '@/app/_lib/dishes'; // Import phương thức lấy món ăn

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
    <div className="max-w-6xl mx-auto mt-8">
      {/* Truyền thông tin thực phẩm vào FoodDetail */}
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {food.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <FoodDetailPage food={food} />
        </Suspense>
      </div>
    </div>
  );
}
