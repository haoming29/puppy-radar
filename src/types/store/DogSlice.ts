import { Dog } from "../general/Dog";

export default interface DogSlice {
  likedDogs: Record<string, boolean>;
  matchedDog: Dog | undefined;
  setLikedDogs: (ids: Record<string, boolean>) => void;
  getLikedDogsFromLocalStorage: () => void;
  clearLikedDogs: () => void;
}
