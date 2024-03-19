import { FormValidationType, PositionsType } from "../react-app-env";

export const initialPosition: PositionsType = {
  id: 999,
  name: ''
};

export const initialNameValidData: FormValidationType = {
  hint: 'Username should contain 2-60 characters',
  errorStatus: false
}

export const initialEmailValidData: FormValidationType = {
  hint: 'Email is required',
  errorStatus: false
};

export const initialPhoneNumberValidData: FormValidationType = {
  hint: 'Phone number is required',
  errorStatus: false
};

export const initialImgValidData: FormValidationType = {
  hint: 'Img format must be .jpg/.jpeg and lower than 5Mb',
  errorStatus: false
}

export const initialImgPlaceholder = 'Upload your photo';
 