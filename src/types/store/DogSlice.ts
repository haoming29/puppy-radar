import { Dog } from "../general/Dog";

export default interface DogSlice {
  likedDogs: [];
  matchedDog: Dog | undefined;
}
