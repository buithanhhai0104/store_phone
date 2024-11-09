import React from "react";
import { ReactNode } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
interface MainLayoutProps {
  children: ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
