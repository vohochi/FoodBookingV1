'use client'

import React, { useState } from 'react';
import HistoryOrder from './historyOrder';
import Order from './order';
import InfoUser from './infoUser';
import UnderNavigation from '@/_components/UnderNavigation';

const page = () => {
  const [activeTab, setActiveTab] = useState('info');
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Profile Section ======= */}
        <section id="" className="specials">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Check your</h2>
              <p>Information</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
              <div className="col-lg-3 ">
                <ul className="nav nav-tabs flex-column">
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'info' ? 'active show' : ''}`}
                      onClick={() => setActiveTab('info')}
                    >
                      Thông tin cá nhân
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'order' ? 'active show' : ''}`}
                      onClick={() => setActiveTab('order')}
                    >
                      Đơn hàng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link ${activeTab === 'history' ? 'active show' : ''}`}
                      onClick={() => setActiveTab('history')}
                    >
                      Lịch sử mua hàng
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  <div className="tab-pane active show">
                    {activeTab === 'info' && <InfoUser />}
                    {activeTab === 'order' && <Order />}
                    {activeTab === 'history' && <HistoryOrder />}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>
        {/* End Specials Section */}

      </main>
    </>

  );
};

export default page;
