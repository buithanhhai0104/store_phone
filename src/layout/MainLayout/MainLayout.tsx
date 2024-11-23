import React from "react";
import { ReactNode } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
interface MainLayoutProps {
  children: ReactNode;
}
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className=" flex  flex-col bg-[#f2f4f7] dark:bg-[#3e3e3f] text-black dark:text-white">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default MainLayout;
