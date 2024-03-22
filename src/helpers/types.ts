export type TripObjType = {
  id: number;
  name: string;
  date: string;
  country: string;
  city: string;
  rating: number;
  description: string;
  price: number;
  user_id: number;
  image_main: string;
  images_1?: string;
  images_2?: string;
  images_3?: string;
};

export type TripObjTypeNoId = Omit<TripObjType, 'id'>;

export type UserObjType = {
  id?: number;
  name?: string;
  email: string;
  password: string;
};

export type CountryObjType = {
  id: number;
  name: string;
  description: string;
  image_main: string;
  created_at: string;
};