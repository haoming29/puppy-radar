export enum SORTING {
  asc = "asc",
  desc = "desc",
}

export type BreedsResponse = [string];

export interface SearchDogRequest {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
}

export interface SearchDogResponse {
  resultIds: [string];
  total: number;
  next: string;
  prev: string;
}

export type DogsDetailRequest = string[];

export interface DogMatchResponse {
  match: string;
}
