'use client';

import React, { useState } from 'react';
import HistoryOrder from './historyOrder';
import Order from './order';
import InfoUser from './infoUser';
import UnderNavigation from '@/_components/UnderNavigation';

interface Tab {
  label: string;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  { label: 'Thông tin cá nhân', component: InfoUser },
  { label: 'Đơn hàng', component: Order },
  { label: 'Lịch sử mua hàng', component: HistoryOrder },
];

const Page = () => {
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
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {tabs.map((tab, index) => (
                    <li className="nav-item" key={index}>
                      <a
                        className={`nav-link ${
                          activeTab === tab.label ? 'active show' : ''
                        }`}
                        onClick={() => setActiveTab(tab.label)}
                      >
                        {tab.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  {tabs.map((tab, index) => (
                    <div
                      key={index}
                      className={`tab-pane ${
                        activeTab === tab.label ? 'active show' : ''
                      }`}
                    >
                      {tab.component}
                    </div>
                  ))}
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

export default Page;
