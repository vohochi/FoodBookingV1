import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Menu } from '@/types/Menu';
import { RootState } from '@/store';

interface BtnFavoriteProps {
  food: Menu; // The food item that will be added/removed from the wishlist
  onClick: (food: Menu) => void; // Trigger function for handling wishlist action
}

const BtnFavorite = ({ food, onClick }: BtnFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const wishlist = useSelector((state: RootState) => state.wishlist.items); // Assuming you store wishlist in Redux

  // Effect to check if the food is in the wishlist
  useEffect(() => {
    setIsFavorite(wishlist.some((item: Menu) => item._id === food._id));
  }, [wishlist, food._id]);

  const toggleFavorite = () => {
    onClick(food); // This will trigger the action passed as a prop
  };

  return (
    <div
      className="rounded-circle border p-2"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'transform 1s ease',
        boxSizing: 'border-box',
        width: '45px',
        height: '45px',
      }}
    >
      <i
        className={`fa fa-heart ${isFavorite ? 'favorite' : ''}`}
        style={{
          fontSize: '24px',
          color: isFavorite ? 'red' : 'gray',
        }}
        onClick={toggleFavorite}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      ></i>
    </div>
  );
};

export default BtnFavorite;
