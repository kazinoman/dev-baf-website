"use client";

import React, { ReactNode } from "react";
import ToastProvider from "../ui/ToastProvider";
import Header from "./Header";
import Footer from "./Footer";
import { useHideLayout } from "@/hooks/hideHeaderAndFooter";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const hideLayout = useHideLayout();

  return (
    <>
      <ToastProvider />

      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
