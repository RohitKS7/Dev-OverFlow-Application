"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as ShadToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToastContext } from "../../context/ToastContext";

export function Toaster() {
  const { toasts } = useToastContext();

  return (
    <ShadToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ShadToastProvider>
  );
}
