import { create } from "zustand";
import UserSlice from "@/types/store/UserSlice";
import DogSlice from "@/types/store/DogSlice";

export type StoreSlice = UserSlice & DogSlice;

const useStore = create<StoreSlice>()((set, get) => ({
  authStatus: 0,
  setAuthStatus: (status) => {
    set((state) => ({ authStatus: status }));
  },
  matchedDog: undefined,
  likedDogs: [],
}));

export default useStore;
