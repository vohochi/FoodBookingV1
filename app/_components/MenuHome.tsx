import Image from 'next/image';

const MenuHome = () => {
  return (
    <section id="menu" className="menu section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Menu</h2>
          <p>Check Our Tasty Menu</p>
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay={100}>
          <div className="col-lg-12 d-flex justify-content-center">
            <ul id="menu-flters">
              <li data-filter="*" className="filter-active">
                All
              </li>
              <li data-filter=".filter-starters">Starters</li>
              <li data-filter=".filter-salads">Salads</li>
              <li data-filter=".filter-specialty">Specialty</li>
            </ul>
          </div>
        </div>
        <div
          className="row menu-container"
          data-aos="fade-up"
          data-aos-delay={200}
        >
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
              <a href="#">Lobster Bisque</a>
              <span>$5.95</span>
            </div>
            <div className="menu-ingredients">
              Lorem, deren, trataro, filede, nerada
            </div>
          </div>

          <div className="col-lg-6 menu-item filter-starters">
            <Image
              width={70} // Giữ kích thước theo CSS
              height={70} // Giữ kích thước theo CSS
              src="/img/menu/cake.jpg"
              className="menu-img"
              alt="Crab Cake"
              layout="fixed" // Sử dụng layout fixed để giữ kích thước
            />
            <div className="menu-content">
              <a href="#">Crab Cake</a>
              <span>$7.95</span>
            </div>
            <div className="menu-ingredients">
              A delicate crab cake served on a toasted roll with lettuce and
              tartar sauce
            </div>
          </div>

          <div className="col-lg-6 menu-item filter-salads">
            <Image
              width={70} // Giữ kích thước theo CSS
              height={70} // Giữ kích thước theo CSS
              src="/img/menu/caesar.jpg"
              className="menu-img"
              alt="Caesar Selections"
              layout="fixed" // Sử dụng layout fixed để giữ kích thước
            />
            <div className="menu-content">
              <a href="#">Caesar Selections</a>
              <span>$8.95</span>
            </div>
            <div className="menu-ingredients">
              Lorem, deren, trataro, filede, nerada
            </div>
          </div>

          <div className="col-lg-6 menu-item filter-specialty">
            <Image
              width={70} // Giữ kích thước theo CSS
              height={70} // Giữ kích thước theo CSS
              src="/img/menu/tuscan-grilled.jpg"
              className="menu-img"
              alt="Tuscan Grilled"
              layout="fixed" // Sử dụng layout fixed để giữ kích thước
            />
            <div className="menu-content">
              <a href="#">Tuscan Grilled</a>
              <span>$9.95</span>
            </div>
            <div className="menu-ingredients">
              Grilled chicken with provolone, artichoke hearts, and roasted red
              pesto
            </div>
          </div>

          <div className="col-lg-6 menu-item filter-starters">
            <Image
              width={70} // Giữ kích thước theo CSS
              height={70} // Giữ kích thước theo CSS
              src="/img/menu/mozzarella.jpg"
              className="menu-img"
              alt="Mozzarella Stick"
              layout="fixed" // Sử dụng layout fixed để giữ kích thước
            />
            <div className="menu-content">
              <a href="#">Mozzarella Stick</a>
              <span>$4.95</span>
            </div>
            <div className="menu-ingredients">
              Lorem, deren, trataro, filede, nerada
            </div>
          </div>

          <div className="col-lg-6 menu-item filter-salads">
            <Image
              width={70} // Giữ kích thước theo CSS
              height={70} // Giữ kích thước theo CSS
              src="/img/menu/greek-salad.jpg"
              className="menu-img"
              alt="Greek Salad"
              layout="fixed" // Sử dụng layout fixed để giữ kích thước
            />
            <div className="menu-content">
              <a href="#">Greek Salad</a>
              <span>$9.95</span>
            </div>
            <div className="menu-ingredients">
              Fresh spinach, crisp romaine, tomatoes, and Greek olives
            </div>
          </div>

          <div className="col-lg-6 menu-item filter-salads">
            <Image
              width={70} // Giữ kích thước theo CSS
              height={70} // Giữ kích thước theo CSS
              src="/img/menu/spinach-salad.jpg"
              className="menu-img"
              alt="Spinach Salad"
              layout="fixed" // Sử dụng layout fixed để giữ kích thước
            />
            <div className="menu-content">
              <a href="#">Spinach Salad</a>
              <span>$9.95</span>
            </div>
            <div className="menu-ingredients">
              Fresh spinach with mushrooms, hard boiled egg, and warm bacon
              vinaigrette
            </div>
          </div>

          <div className="col-lg-6 menu-item filter-specialty">
            <Image
              width={70} // Giữ kích thước theo CSS
              height={70} // Giữ kích thước theo CSS
              src="/img/menu/lobster-roll.jpg"
              className="menu-img"
              alt="Lobster Roll"
              layout="fixed" // Sử dụng layout fixed để giữ kích thước
            />
            <div className="menu-content">
              <a href="#">Lobster Roll</a>
              <span>$12.95</span>
            </div>
            <div className="menu-ingredients">
              Plump lobster meat, mayo and crisp lettuce on a toasted bulky roll
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuHome;
