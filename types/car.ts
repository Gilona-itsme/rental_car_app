export interface CarLocation {
  country: string;
  city: string;
  address: string;
}

export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string; 
  img: string;
  description: string;
  fuelConsumption: number;
  engine: string;
  features: string[];
  rentalPrice: string; 
  rentalCompany: string;
  rentalConditions: string[];
  location: CarLocation;
  mileage: number;
  stockNumber: number;
  createdAt: string; 
  updatedAt: string; 
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  totalPages: number;
  page: number;
  perPage: number;
}


export interface CarFilters {
  brand: string;
	price: number | "";
	mileageFrom: string;
	mileageTo: string;
}

export interface FetchCarsParams {
  page: number;
  perPage: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface BookingDraft {
  name: string;
  email: string;
  comment?: string;
}

export interface CreateBookingResponse {
  message: string;
}