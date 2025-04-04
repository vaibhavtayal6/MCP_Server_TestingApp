
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Navbar />
      <main className="flex-1 px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
