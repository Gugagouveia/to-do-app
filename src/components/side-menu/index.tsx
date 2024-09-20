"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronsRight,
  List as ListIcon,
  Settings,
  LogOut,
  ChevronsLeft,
} from "lucide-react";
import CreateInput from "../create-input";
import { createList, getLists } from "@/server/actions/tasks";
import { HexColorPicker } from "react-colorful";
import Modal from "../modal";
import toast, { Toaster } from "react-hot-toast";
import ListItem from "../list-item";

const SideMenu: React.FC = () => {
  const [color, setColor] = useState("#333");
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [lists, setLists] = useState<any[]>([]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCreateClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalCreate = async () => {
    try {
      await createList(newListName, color);
      toast.success("Lista criada com sucesso!");
      setIsModalOpen(false);
      setNewListName("");
      setColor("#333");
      fetchLists();
    } catch (error: any) {
      let errorMessage = "Erro ao criar lista.";

      if (
        error.message.toLowerCase().includes("unique constraint") &&
        error.message.toLowerCase().includes("name")
      ) {
        errorMessage = "Lista já existe.";
      }

      toast.error(errorMessage);
    }
  };

  const fetchLists = async () => {
    try {
      const lists = await getLists();
      setLists(lists);
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div
      className={`h-full ${
        isOpen ? "w-[346px]" : "w-16"
      } bg-[#F4F4F4] text-black flex flex-col transition-all duration-300`}
    >
      <div className="h-24 flex items-center justify-between px-4 bg-[#F4F4F4]">
        <div className="flex items-center">
          <span className={`text-4xl font-bold ${isOpen ? "block" : "hidden"}`}>
            Menu
          </span>
        </div>
        <button onClick={toggleMenu} className="p-2 focus:outline-none">
          {isOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 text-[20px] font-bold">
        <span className={`${isOpen ? "block" : "hidden"}`}>Tarefas</span>
        {isOpen && (
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-sm text-black bg-[#F4F4F4] rounded-lg hover:bg-slate-300"
          >
            <ChevronsRight className="mr-3" size={20} />{" "}
            <span className={`${isOpen ? "block" : "hidden"}`}>Próximos</span>
          </a>
        )}
        {isOpen && (
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-sm text-black bg-[#F4F4F4] rounded-lg hover:bg-slate-300"
          >
            <ListIcon className="mr-3" size={20} />{" "}
            <span className={`${isOpen ? "block" : "hidden"}`}>Hoje</span>
          </a>
        )}
        <div className={`${isOpen ? "my-24" : "my-4"}`}></div>
        <span className={`${isOpen ? "block" : "hidden"}`}>Listas</span>

        <div className="mt-2"></div>
        {isOpen && (
          <CreateInput
            onCreate={(value) => {
              setNewListName(value);
              handleCreateClick();
            }}
            placeholderText={"Adicionar Nova Lista"}
          />
        )}

        <div className="mt-4">
          {lists.map((list) => (
            <ListItem
              key={list.id}
              color={list.color}
              isOpen={isOpen}
              label={list.name}
            />
          ))}
        </div>
      </nav>
      <div className="w-full px-2 pb-4">
        {isOpen && (
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-sm text-black font-bold bg-[#F4F4F4] rounded-lg hover:bg-slate-300"
          >
            <Settings className="mr-3" size={20} />
            <span className={`${isOpen ? "block" : "hidden"}`}>
              Configurações
            </span>
          </a>
        )}
        {isOpen && (
          <a
            href="/"
            className="flex items-center px-4 py-2 mt-2 text-sm text-black font-bold bg-[#F4F4F4] rounded-lg hover:bg-slate-300"
          >
            <LogOut className="mr-3" size={20} />
            <span className={`${isOpen ? "block" : "hidden"}`}>Sair</span>
          </a>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onCreate={handleModalCreate}
      >
        <HexColorPicker color={color} onChange={setColor} />
      </Modal>
      <Toaster />
    </div>
  );
};

export default SideMenu;
