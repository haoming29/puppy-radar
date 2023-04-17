/**
 * This file contains all API requests to the backend service.
 * Add more as you needed.
 */
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

/**
 * Log a user in given their name and email
 * @param data : user name and email address
 * @returns status
 */
export const loginUser = (data: LoginUserRequest) => {
  return http.post(LOGIN_USER, data);
};

/**
 * Get the availbale bredd names of dogs
 * @returns An array of breed names
 */
export const getDogsBreeds = (): Promise<BreedsResponse> => {
  return http.get(GET_DOGS_BREEDS);
};

/**
 * Search dogs based on breeds, age, and sort the result asc/desc of breed name
 * @param query search query
 * @returns Filtered dog ids
 */
export const searchDogs = (
  query: SearchDogRequest
): Promise<SearchDogResponse> => {
  const sizedQuery: SearchDogRequest = { size: DEFAULT_PAGE_SIZE, ...query };
  return http.get(SEARCH_DOGS, { params: sizedQuery });
};

/**
 * Get the detail informaton of an array of dogs
 * @param ids An array of ids of the dogs
 * @returns An array of Dog objects
 */
export const getDogsDetail = (ids: DogsDetailRequest): Promise<Dog[]> => {
  return http.post(GET_DOGS_DETAIL, ids);
};

/**
 * Match a dog given a array of dogs
 * @param ids An array of ids of dogs
 * @returns the matched dog id
 */
export const matchDog = (ids: DogsDetailRequest): Promise<DogMatchResponse> => {
  return http.post(MATCH_DOG, ids);
};
