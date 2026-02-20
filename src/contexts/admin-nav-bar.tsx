"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
  title: string;
  setTitle: (title: string) => void;
  children: ReactNode;
  setChildren: (children: ReactNode) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function AdminNavbarProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("Inicio");
  const [navbarChildren, setNavbarChildren] = useState<ReactNode>(null);

  return (
    <NavbarContext.Provider
      value={{
        title,
        setTitle,
        children: navbarChildren,
        setChildren: setNavbarChildren,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar debe usarse dentro de NavbarProvider");
  }
  return context;
};
