import Image from 'next/image';

export default function FoodDetailPage({ food }) {
  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Render Header */}

      <div className="food-detail">
        <h1 className="text-5xl font-semibold text-center mb-10">
          {food.name}
        </h1>
        {/* <img src={food.image} className="w-full h-auto mb-6" /> */}

        <Image
          width={70}
          height={70}
          src={`http://localhost:3002/images/${food.image}`}
          className="menu-img"
          alt={food.name}
          layout="fixed"
        />
        <p className="text-lg text-center">{food.description}</p>
        <p className="text-xl font-bold text-center mt-4">
          <p>Price: {food.price?.$numberDecimal || food.price}</p>{' '}
          {/* Chỉ hiển thị giá trị */}
        </p>
      </div>

      {/* Render Footer */}
    </div>
  );
}
