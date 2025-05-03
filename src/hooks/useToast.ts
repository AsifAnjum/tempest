import { useState } from "react";
import { ToastProps, ToastVariants } from "../components/toast";

export const useToast = () => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (message: string, variant: ToastVariants): void => {
    setToast({ message, variant });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const closeToast = (): void => {
    setToast(null);
  };

  return {
    toast,
    showToast,
    closeToast,
  };
};
