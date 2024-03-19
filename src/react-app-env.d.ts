/// <reference types="react-scripts" />

export type UserDataType = {
  email: string;
  id: number;
  name: string;
  phone: string;
  photo: string;
  position: string;
  position_id: number;
  registration_timestamp: number;
}

export type FormValidationType = {
  hint: string; 
  errorStatus: boolean;
}

export type PositionsType = {
  id: number;
  name: string;
}
