import Image from 'next/image';

const MenusSpecials = () => {
  return (
    <section id="specials" className="specials">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Đặc biệt</h2>
          <p>Kiểm tra sản phẩm đặc biệt của chúng tôi</p>
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay={100}>
          <div className="col-lg-3">
            <ul className="nav nav-tabs flex-column">
              <li className="nav-item">
                <a
                  className="nav-link active show"
                  data-bs-toggle="tab"
                  href="#tab-1"
                >
                  Món ăn độc đáo với hương vị tinh tế
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                Món này mang hương vị truyền thống nhưng được cải tiến để trở nên thú vị hơn
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                Sự kết hợp hoàn hảo giữa nguyên liệu tươi ngon và cách chế biến sáng tạo
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-4">
                Hương vị phong phú, đem lại cảm giác mới lạ cho người thưởng thức
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-bs-toggle="tab" href="#tab-5">
                Món ăn nổi bật với sự tinh tế trong cách trình bày và hương vị
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-9 mt-4 mt-lg-0">
            <div className="tab-content">
              <div className="tab-pane active show" id="tab-1">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>Kiến Tạo Hương Vị Đặc Biệt</h3>
                    <p className="fst-italic">
                      Qui laudantium consequatur laborum sit qui ad sapiente
                      dila parde sonata raqer a videna mareta paulona marka
                    </p>
                    <p>
                      Et nobis maiores eius. Voluptatibus ut enim blanditiis
                      atque harum sint. Laborum eos ipsum ipsa odit magni.
                      Incidunt hic ut molestiae aut qui. Est repellat minima
                      eveniet eius et quis magni nihil. Consequatur dolorem
                      quaerat quos qui similique accusamus nostrum rem vero
                    </p>
                    <div className="col-2 book-a-table-btn">order</div>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <Image
                      width={70} // Giữ kích thước theo CSS
                      height={70} // Giữ kích thước theo CSS
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="tab-2">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>Et blanditiis nemo veritatis excepturi</h3>
                    <p className="fst-italic">
                      Qui laudantium consequatur laborum sit qui ad sapiente
                      dila parde sonata raqer a videna mareta paulona marka
                    </p>
                    <p>
                      Ea ipsum voluptatem consequatur quis est. Illum error
                      ullam omnis quia et reiciendis sunt sunt est. Non aliquid
                      repellendus itaque accusamus eius et velit ipsa
                      voluptates. Optio nesciunt eaque beatae accusamus lerode
                      pakto madirna desera vafle de nideran pal
                    </p>
                    <div className="col-2 book-a-table-btn">order</div>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <Image
                      width={70} // Giữ kích thước theo CSS
                      height={70} // Giữ kích thước theo CSS
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="tab-3">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>Impedit facilis occaecati odio neque aperiam sit</h3>
                    <p className="fst-italic">
                      Eos voluptatibus quo. Odio similique illum id quidem non
                      enim fuga. Qui natus non sunt dicta dolor et. In
                      asperiores velit quaerat perferendis aut
                    </p>
                    <p>
                      Iure officiis odit rerum. Harum sequi eum illum corrupti
                      culpa veritatis quisquam. Neque necessitatibus illo rerum
                      eum ut. Commodi ipsam minima molestiae sed laboriosam a
                      iste odio. Earum odit nesciunt fugiat sit ullam. Soluta et
                      harum voluptatem optio quae
                    </p>
                    <div className="col-2 book-a-table-btn">order</div>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <Image
                      width={70} // Giữ kích thước theo CSS
                      height={70} // Giữ kích thước theo CSS
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="tab-4">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>
                      Fuga dolores inventore laboriosam ut est accusamus
                      laboriosam dolore
                    </h3>
                    <p className="fst-italic">
                      Totam aperiam accusamus. Repellat consequuntur iure
                      voluptas iure porro quis delectus
                    </p>
                    <p>
                      Eaque consequuntur consequuntur libero expedita in
                      voluptas. Nostrum ipsam necessitatibus aliquam fugiat
                      debitis quis velit. Eum ex maxime error in consequatur
                      corporis atque. Eligendi asperiores sed qui veritatis
                      aperiam quia a laborum inventore
                    </p>
                    <div className="col-2 book-a-table-btn">order</div>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <Image
                      width={70} // Giữ kích thước theo CSS
                      height={70} // Giữ kích thước theo CSS
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                </div>
              </div>
              <div className="tab-pane" id="tab-5">
                <div className="row">
                  <div className="col-lg-8 details order-2 order-lg-1">
                    <h3>
                      Est eveniet ipsam sindera pad rone matrelat sando reda
                    </h3>
                    <p className="fst-italic">
                      Omnis blanditiis saepe eos autem qui sunt debitis porro
                      quia.
                    </p>
                    <p>
                      Exercitationem nostrum omnis. Ut reiciendis repudiandae
                      minus. Omnis recusandae ut non quam ut quod eius qui.
                      Ipsum quia odit vero atque qui quibusdam amet. Occaecati
                      sed est sint aut vitae molestiae voluptate vel
                    </p>
                    <div className="col-2 book-a-table-btn">order</div>
                  </div>
                  <div className="col-lg-4 text-center order-1 order-lg-2">
                    <Image
                      width={70} // Giữ kích thước theo CSS
                      height={70} // Giữ kích thước theo CSS
                      src="/img/menu/lobster-bisque.jpg"
                      className="menu-img"
                      alt="Lobster Bisque"
                      layout="fixed" // Sử dụng layout fixed để giữ kích thước
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenusSpecials;
