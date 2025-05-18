import { FC, ReactNode } from "react";
import { Modal } from "@mui/material";

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const AppModal: FC<AppModalProps> = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
        {children}
      </div>
    </Modal>
  );
};
