"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { ToastProps } from "@/components/ui/use-toast";

interface ToastContextProps {
  showToast: (toast: ToastProps) => void;
  toasts: ToastProps[];
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const showToast = (toast: ToastProps) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { ...toast, id: Math.random().toString(36).substr(2, 9) },
    ]);
    setTimeout(() => setToasts((prevToasts) => prevToasts.slice(1)), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
