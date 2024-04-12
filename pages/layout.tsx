import React, { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
        {children}
    </>
  );
}
