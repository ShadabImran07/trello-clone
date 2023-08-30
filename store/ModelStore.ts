import { create } from "zustand";

interface ModelState {
	isOpen: boolean;
	openModal: () => void;
	closeModel: () => void;
}

export const useModelStore = create<ModelState>((set) => ({
	isOpen: false,
	openModal: () => set({ isOpen: true }),
	closeModel: () => set({ isOpen: false }),
}));
