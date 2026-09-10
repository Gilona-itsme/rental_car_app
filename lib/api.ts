import axios, { AxiosResponse } from "axios";
import type { Car, CarsResponse, FetchCarsParams, CreateBookingPayload, CreateBookingResponse } from "@/types/car";

const carsApi = axios.create({
  baseURL: 'https://car-rental-api.goit.study',
});

export const fetchCars= async (
   params: FetchCarsParams,
): Promise<CarsResponse> => {
  const response: AxiosResponse<CarsResponse> = await carsApi.get(
    '/cars',
     { params },
  );
  return response.data;
};

export const fetchCarById = async (carId: string): Promise<Car> => {
  const response: AxiosResponse<Car> = await carsApi.get(`/cars/${carId}`);
  return response.data;
};

export const createBookingCar = async (
  payload: CreateBookingPayload,
  carId: string,
): Promise<CreateBookingResponse> => {
  const response: AxiosResponse<CreateBookingResponse> = await carsApi.post(
    `/cars/${carId}/booking-requests`,
    payload,
  );
  return response.data;
};


