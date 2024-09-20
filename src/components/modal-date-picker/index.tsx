import React, { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  onCreateTask: () => void;
}

const Modaldatepicker: FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onDateChange,
  onCreateTask,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" />
      <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <DialogTitle className="mb-4 text-base font-semibold">
            Selecione a Data de Expiração
          </DialogTitle>
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border border-gray-300 rounded-lg"
            minDate={new Date()}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 rounded-lg"
            >
              Cancelar
            </Button>
            <Button
              onClick={onCreateTask}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Criar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modaldatepicker;
