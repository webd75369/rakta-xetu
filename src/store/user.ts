import { create } from "zustand";

type UserSearchStore = {
  searchUser: string;
  setSearchUser: (term: string) => void;
};

export const useSearchUser = create<UserSearchStore>((set) => ({
  searchUser: "",
  setSearchUser: (term) => set({ searchUser: term }),
}));
