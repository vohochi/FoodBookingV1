'use client';

import React, { useState } from 'react';
// import HistoryOrder from './historyOrder';
import Order from './order';
import InfoUser from './infoUser';
import UnderNavigation from '@/_components/UnderNavigation';
import ChangePass from './changePass';
import { Person, ShoppingCart, Lock } from '@mui/icons-material';
import SnackbarNotification from '@/_components/SnackbarAlert';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Tab {
  label: string;
  component: React.ComponentType;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { label: 'Thông tin cá nhân', component: InfoUser, icon: <Person /> },
  { label: 'Đơn hàng', component: Order, icon: <ShoppingCart /> },
  // { label: 'Lịch sử mua hàng', component: HistoryOrder, icon: <History /> },
  { label: 'Đổi mật khẩu', component: ChangePass, icon: <Lock /> },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');

  const profile = useSelector((state: RootState) => state.profile);

  React.useEffect(() => {
    if (!profile.fullname) {
      setSnackbarMessage(`Vui lòng đăng nhập để vào profile!`);
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
      window.location.href = '/auth/login';
    }
  }, [profile]);
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Profile Section ======= */}
        <section id="" className="specials">
          <div className="container">
            <div className="section-title">
              <h2>Check your</h2>
              <p>Information</p>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  {tabs.map((tab, index) => (
                    <li className="nav-item" key={index}>
                      <a
                        className={`nav-link ${activeTab === tab.label ? 'active show' : ''}`}
                        onClick={() => setActiveTab(tab.label)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                        }}
                      >
                        <span style={{ marginRight: '8px', display: 'flex', alignItems: 'flex-end' }}>
                          {tab.icon}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'flex-end' }}>{tab.label}</span>
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
                      className={`tab-pane ${activeTab === tab.label ? 'active show' : ''}`}
                    >
                      <tab.component />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <SnackbarNotification
          snackbarOpen={snackbarOpen}
          message={snackbarMessage}
          severity={snackbarSeverity}
          snackbarOnclose={() => setSnackbarOpen(false)}
        />
      </main>
    </>
  );
};

export default Page;
