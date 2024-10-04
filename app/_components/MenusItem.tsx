import Image from 'next/image';

const MenusItem = () => {
  return (
    <div className="col-lg-6 menu-item filter-starters">
      <Image
        width={70} // Giữ kích thước theo CSS
        height={70} // Giữ kích thước theo CSS
        src="/img/menu/lobster-bisque.jpg"
        className="menu-img"
        alt="Lobster Bisque"
        layout="fixed" // Sử dụng layout fixed để giữ kích thước
      />
      <div className="menu-content">
        <a href="#">Bread Barrel</a>
        <span>$6.95</span>
      </div>
      <div className="menu-ingredients row">
        <span className="col-10">
          Lorem, deren, trataro, filede, neradaLorem, trataro, filede,
          neradaLorem, trataro, filede, neradaLorem, trataro, filede,
          neradaLorem, trataro, filede, neradaLorem, trataro, filede,
          neradaLorem, trataro, filede, neradaLorem,
        </span>
        <span className="book-a-table-btn col-2 m-0">order</span>
      </div>
    </div>
  );
};

export default MenusItem;
