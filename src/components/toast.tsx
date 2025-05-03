import { cva } from "class-variance-authority";

export type ToastVariants = "success" | "error" | "info" | "warning";

export interface ToastProps {
  message: string;
  variant: ToastVariants;
  onClose?: () => void;
}

const toastVariants = cva("fixed top-4 right-4 m-4 p-4 rounded-lg shadow-lg", {
  variants: {
    variant: {
      success: "bg-green-400 text-white",
      error: "bg-red-400 text-white",
      info: "bg-blue-400 text-white",
      warning: "bg-yellow-400 text-white",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const Toast = ({ message, variant, onClose }: ToastProps) => {
  return (
    <div className={toastVariants({ variant })}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold ml-4">
        ×
      </button>
    </div>
  );
};
