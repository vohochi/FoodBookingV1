import Navigation from '@/_components/Navigation';
import TopBar from '@/_components/TopBar';
import { useAuth } from '@/context/AuthContext';

// import { login } from '@/_lib/auth';

const Header = () => {
  const { isAuthReady } = useAuth();
  if (!isAuthReady) return null;
  return (
    <>
      <TopBar />
      <Navigation />
    </>
  );
};

export default Header;
