import MenusItem from '@/_components/MenusItem';
import { getDishes } from '@/_lib/dishes';

const MenusList = async () => {
  const {dishes}  = await getDishes();

 

  return (
    <div className="row menu-container" data-aos="fade-up" data-aos-delay={200}>
      {dishes.map((food) => (
        <MenusItem food={food} key={food._id} />
      ))}
    </div>
  );
};

export default MenusList;
