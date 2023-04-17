import { LoginUserRequest } from "@/types/api/User";
import {
  GET_DOGS_BREEDS,
  GET_DOGS_DETAIL,
  LOGIN_USER,
  MATCH_DOG,
  SEARCH_DOGS,
} from "./api";
import http from "./axios";
import {
  BreedsResponse,
  DogMatchResponse,
  DogsDetailRequest,
  SearchDogRequest,
  SearchDogResponse,
} from "@/types/api/Dog";
import { Dog } from "@/types/general/Dog";
import { DEFAULT_PAGE_SIZE } from "@/configs";

export const loginUser = (data: LoginUserRequest) => {
  return http.post(LOGIN_USER, data);
};

export const getDogsBreeds = (): Promise<BreedsResponse> => {
  return http.get(GET_DOGS_BREEDS);
};

export const searchDogs = (
  query: SearchDogRequest
): Promise<SearchDogResponse> => {
  const sizedQuery: SearchDogRequest = { size: DEFAULT_PAGE_SIZE, ...query };
  return http.get(SEARCH_DOGS, { params: sizedQuery });
};

export const getDogsDetail = (ids: DogsDetailRequest): Promise<Dog[]> => {
  return http.post(GET_DOGS_DETAIL, ids);
};

export const matchDog = (ids: DogsDetailRequest): Promise<DogMatchResponse> => {
  return http.post(MATCH_DOG, ids);
};
