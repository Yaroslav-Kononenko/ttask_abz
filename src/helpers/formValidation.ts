//variables
import {
  initialNameValidData,
  initialEmailValidData, 
  initialPhoneNumberValidData,
  initialImgValidData
} from "./inititals";

//types
import { FormValidationType } from "../react-app-env";

const validEmail = new RegExp(
  '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
);
const imgSizeLimit = 5242880;

export const validateName = (nameLength: number): FormValidationType => { 
  const validationData = Object.assign({}, initialNameValidData);
  
  if (nameLength === 0 || (nameLength >= 3 && nameLength <= 59)) {
    validationData.hint = 'Username should contain 2-60 characters';
  } else if (nameLength === 1 || nameLength === 2) {
    validationData.hint = 'Error: name length must be more than 2';
    validationData.errorStatus = true;
  } else if (nameLength >= 60) {
    validationData.hint = 'Error: name length must be lower than 60';
    validationData.errorStatus = true;
  } else {
    validationData.errorStatus = false;
  }
  
  return validationData;
};

export const validateEmail = (email: string): FormValidationType => { 
  const validationData = Object.assign({}, initialEmailValidData);
  
  if (!email) {
    validationData.hint = 'Email is required';
  } else if (!validEmail.test(email)) {
    validationData.hint = 'Error: Invalid email format';
    validationData.errorStatus = true;
  } else {
    validationData.errorStatus = false;
  }
  
  return validationData;
};

export const validatePhoneNumber = (phoneNumber: string): FormValidationType => { 
  const validationData = Object.assign({}, initialPhoneNumberValidData);

  if (phoneNumber.length < 7 && phoneNumber.length !==0) {
    validationData.hint = 'Error: Phone number must be at least 7 digits long';
    validationData.errorStatus = true;
  } else if (phoneNumber.length > 15) {
    validationData.hint = 'Error: Phone number must be no more than 15 digits long';
    validationData.errorStatus = true;
  } else {
    validationData.hint = 'Enter number in UA format: +380';
    validationData.errorStatus = false;
  }
  
  return validationData;
};

export const validateImg = (name: string, size: number): FormValidationType => {
  const validationData = Object.assign({}, initialImgValidData);
  const formatError = size !== 0 && !(name.includes('.jpg') || name.includes('.jpeg'));
  const sizeError = size > imgSizeLimit;

  if (formatError && sizeError) {
    validationData.hint = 'Error: format must be .jpg/.jpeg and size lower than 5Mb';
    validationData.errorStatus = true;
  } else if (formatError) {
    validationData.hint = 'Error: format must be .jpg/.jpeg';
    validationData.errorStatus = true;
  } else if (sizeError) {
    validationData.hint = 'Error: size must be lower than 5Mb';
    validationData.errorStatus = true;
  } else {
    validationData.errorStatus = false;
  }

  return validationData;
};
