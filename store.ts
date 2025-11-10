import { create } from "zustand";

interface MobileSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set((prev) => ({ ...prev, isOpen: true })),
  onClose: () => set((prev) => ({ ...prev, isOpen: false })),
}));
