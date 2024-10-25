import MenusItem from '@/_components/MenusItem';
import { getDishes } from '@/_lib/dishes';

const MenusList = async () => {
  const menu = await getDishes();

  return (
    <div className="row menu-container" data-aos="fade-up" data-aos-delay={200}>
      {menu.map((food) => (
        <MenusItem food={food} key={food._id} />
      ))}
    </div>
  );
};

export default MenusList;
