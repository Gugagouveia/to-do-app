import React from "react";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
          <DialogTitle className="mb-4 text-base font-semibold text-center">
            Selecione uma cor para a nova lista
          </DialogTitle>
          <div className="flex flex-col items-center mb-4">{children}</div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              onClick={onClose}
              className="p-2 bg-gray-500 text-white rounded-lg"
            >
              Fechar
            </Button>
            <Button
              onClick={onCreate}
              className="p-2 bg-blue-500 text-white rounded-lg"
            >
              Criar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
