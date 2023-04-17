import { create } from "zustand";
import UserSlice, { LoginStatusStorage } from "@/types/store/UserSlice";
import DogSlice from "@/types/store/DogSlice";
import localforage from "localforage";
import { STORAGE_KEYS } from "@/configs";

export type StoreSlice = UserSlice & DogSlice;

const useStore = create<StoreSlice>()((set, get) => ({
  authStatus: 0,
  setAuthStatus: (status) => {
    localforage
      .setItem(STORAGE_KEYS.LOGIN_STATUS, {
        status,
        time: Date.now(),
      })
      .then(() => {
        set((state) => ({ authStatus: status }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getAuthStatusFromStorage: () => {
    localforage
      .getItem(STORAGE_KEYS.LOGIN_STATUS)
      .then((value) => {
        if (!value) {
          set(() => ({ authStatus: 0 }));
          return;
        }
        if (
          (value as LoginStatusStorage).status === 2 &&
          (value as LoginStatusStorage).time - Date.now() > 1 * 60 * 60 * 1000
        ) {
          set(() => ({ authStatus: 0 }));
          localforage.removeItem(STORAGE_KEYS.LOGIN_STATUS);
        } else {
          set(() => ({ authStatus: 2 }));
        }
      })
      .catch((error) => {
        console.log(error);
        set(() => ({ authStatus: 0 }));
      });
  },
  logout: async () => {
    set((state) => ({ authStatus: 0 }));
    await localforage.removeItem(STORAGE_KEYS.LOGIN_STATUS);
  },
  matchedDog: undefined,
  likedDogs: {},
  setLikedDogs: (ids: Record<string, boolean>) => {
    localforage
      .setItem(STORAGE_KEYS.LIKED_LIST, ids)
      .then(() => {
        set((state) => ({ likedDogs: ids }));
      })
      .catch((error) => {
        console.log(error);
      });
  },
  getLikedDogsFromLocalStorage: () => {
    localforage
      .getItem(STORAGE_KEYS.LIKED_LIST)
      .then((value) => {
        if (!value) {
          set((state) => ({ likedDogs: {} }));
        } else {
          set((state) => ({ likedDogs: value as Record<string, boolean> }));
        }
      })
      .catch((errors) => {
        console.log(errors);
      });
  },
  clearLikedDogs: async () => {
    set(() => ({ likedDogs: {} }));
    await localforage.removeItem(STORAGE_KEYS.LIKED_LIST);
  },
}));

export default useStore;
