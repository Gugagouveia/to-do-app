import React from "react";
import { RectangleHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListItemProps {
  isOpen: boolean;
  label: string;
  color: string;
}

const ListItem: React.FC<ListItemProps> = ({ isOpen, label, color }) => {
  return (
    <a
      href="#"
      className="flex items-center px-4 py-2 mt-2 text-sm text-black bg-[#F4F4F4] rounded-lg hover:bg-slate-300"
    >
      {isOpen && (
        <RectangleHorizontalIcon
          className={cn("mr-3")}
          style={{ color }}
          size={20}
        />
      )}
      <span className={`${isOpen ? "block" : "hidden"}`}>{label}</span>
    </a>
  );
};

export default ListItem;
