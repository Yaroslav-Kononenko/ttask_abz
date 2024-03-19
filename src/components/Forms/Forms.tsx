/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import './../../styles/components/Forms.scss';
import classnames from "classnames";
import { postUser, getUsersList, getToken } from "../../api/users.ts";
import successPhoto from './../../assets/success-image.svg';
import { validateName, validateEmail, validatePhoneNumber, validateImg } from './../../helpers/formValidation.ts';
import { UserDataType, FormValidationType, PositionsType } from './../../react-app-env';
import {
  initialNameValidData,
  initialEmailValidData,
  initialPhoneNumberValidData,
  initialImgValidData,
  initialPosition,
  initialImgPlaceholder
  } from "../../helpers/inititals.ts";
import { Loader } from "../Loader";

type Props = {
  setUsers: (users: UserDataType[]) => void,
  setApi: (next_api: string) => void,
  base_api: string,
}

export const Forms: React.FC<Props> = React.memo(({ 
  setUsers,
  setApi,
  base_api
}) => {
  const [name, setName] = useState('');
  const [usermail, setUsermail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState<PositionsType>(initialPosition);
  const [token, setToken] = useState('');
  const [postStatus, setPostStatus] = useState(false);
  const [imgName, setImgName] = useState(initialImgPlaceholder);
  const [imgSize, setImgSize] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [nameValidation, setNameValidation] = useState<FormValidationType>(initialNameValidData);
  const [emailValidation, setEmailValidation] = useState<FormValidationType>(initialEmailValidData);
  const [phoneValidation, setPhoneValidation] = useState<FormValidationType>(initialPhoneNumberValidData);
  const [imgValidation, setImgValidation] = useState<FormValidationType>(initialImgValidData);

  let formTitle = '';
  if (!postStatus) {
    formTitle = 'Working with POST request';
  } else if (postStatus) {
    formTitle = 'User successfully registered';
  }
  
  const disabled = (position.id === 999 
  || nameValidation.errorStatus
  || emailValidation.errorStatus
  || phoneValidation.errorStatus
  || imgValidation.errorStatus
  || nameValidation.errorStatus
  || imgSize === 0);

  useEffect(() => {
    getToken()
      .then(data => {
        setToken(data.token)}); 
  }, [])

  useEffect(() => {
    setNameValidation(validateName(name.length));
  }, [name]);

  useEffect(() => {
    setEmailValidation(validateEmail(usermail))
  }, [usermail]);

  useEffect(() => {
    setPhoneValidation(validatePhoneNumber(phone))
  }, [phone])

  useEffect(() => {
    setImgValidation(validateImg(imgName, imgSize));
  }, [imgName, imgSize])
  
  useEffect(() => {
  }, [disabled])

  const uploadImg = () => {
    const fileField: any = document.querySelector('input[type="file"]');
    setImgName(fileField.files[0].name);
    setImgSize(fileField.files[0].size)
  };
  
  const handleError = (error: any) => {
    let errorMessage = 'An unexpected error occurred';
  
    if (error.message) {
      errorMessage = `The following error(-s) occurred while submitting the form:\n${error.message}`;
    }
  
    alert(errorMessage);
  };
  
  const submit = async () => {
    try {
      const formData = new FormData(); 
      const fileField: any = document.querySelector('input[type="file"]');
      formData.append('name', name); 
      formData.append('position_id', position.id.toString()); 
      formData.append('email', usermail); 
      formData.append('phone', phone); 
      formData.append('photo', fileField.files[0]);
  
      setIsLoading(true);
      const request = await postUser(formData, token);
  
      if (request.success) {
        setPostStatus(true);
        setName('');
        setPhone('');
        setUsermail('');
        
        const data = await getUsersList(base_api);
        setUsers(data.users);
        setApi(data.links.next_url.slice(0, -1) + '6');
        
        const tokenData = await getToken();
        setToken(tokenData.token);
      } else {
        handleError(request);
      }
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Forms" id="Forms">
      <h1 className="Forms__title">{formTitle}</h1>
      <img 
        src={successPhoto} 
        alt="success post request" 
        className="Form__img-success" 
        hidden={!postStatus}
      />
      
      {!postStatus && (
        <form 
          action="/" 
          method="post"
          onSubmit={(event: React.FormEvent) => {
            event.preventDefault();
            submit();
          }}
          className="Form"
        >
          <input 
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={classnames("Form__field", {
              'Error': nameValidation.errorStatus
            })}
            placeholder="Your name"
            required
          />
          <span className={classnames("Name_helper",
            {'Error_text': nameValidation.errorStatus }
          )}>
            {nameValidation.hint}
          </span>

          <input 
            type="tel"
            id="email"
            value={usermail}
            onChange={(event) => setUsermail(event.target.value.trim())}
            className={classnames("Form__field", {
              'Error': emailValidation.errorStatus
            })}
            placeholder="Email"
            required
          />
          <span className={classnames(
              'Name_helper Email_helper', 
              {'Error_text': emailValidation.errorStatus }
            )}
          >
            {emailValidation.hint}
          </span>

          <input 
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value.replace(/[^\d+]/g, ''))}
            className={classnames("Form__field", {
              'Error': phoneValidation.errorStatus
            })}
            placeholder="Phone"
            required
          />
          <span className={classnames(
              'Name_helper Phone_helper', 
              {'Error_text': phoneValidation.errorStatus }
            )}>
            {phoneValidation.hint}
          </span>

          <h2 className="position-subtitle">Select your position</h2>
          <ul className="position-list">
            <li
              className={classnames("position-list__position", 
              {'selected' : position.name === 'Lawyer'})}
              onClick={() => setPosition({id: 1, name: 'Lawyer'})}
            >
              Lawyer
            </li>

            <li 
              className={classnames("position-list__position", 
              {'selected' : position.name === 'Content manager'})}
              onClick={() => setPosition({id: 2, name: 'Content manager'})}
            >
              Content manager
            </li>

            <li 
              className={classnames("position-list__position", 
              {'selected' : position.name === 'Security'})}
              onClick={() => setPosition({id: 3, name: 'Security'})}
            >
              Security
            </li>

            <li 
              className={classnames("position-list__position", 
              {'selected' : position.name === 'Designer'})}
              onClick={() => setPosition({id: 4, name: 'Designer'})}
            >
              Designer
            </li>
          </ul>

          <input 
            type="file" 
            id="input__file" 
            name="file"
            className={classnames("Form__field File-input", 
              {'Filled' : imgName !== 'Upload your photo'},
              {'Error' : imgValidation.errorStatus && imgName !== 'Upload your photo'},
            )} 
            onChange={uploadImg}
            required
            multiple
          />
          <label htmlFor="input__file" 
            className={classnames("Form__field Upload",
              {'Error' : imgValidation.errorStatus && imgName !== 'Upload your photo'},
              )}
          >
            <div 
              className={classnames("Upload__button",
              {'Error' : imgValidation.errorStatus && imgName !== 'Upload your photo'},
              )}
            >          
              <span>Upload</span>
            </div>
            <div 
              className={classnames("Upload__field")}
            >
              <span className={classnames({
                'Filled' : imgName !== initialImgPlaceholder
              })}>
                {imgName}
              </span>
            </div>
          </label>
          <span className={classnames("Name_helper Img_helper",
            {'Error_text' : imgValidation.errorStatus},
          )}>
            {imgValidation.hint}
          </span>
          
          {isLoading ? (<Loader />) : ( 
            <button 
              type="submit"
              className={classnames("button", 
                {'inactive' : disabled }
              )}
              title={disabled? 'You must fill all input fields' : undefined}
              disabled={disabled}
            >
              Sign In
            </button>
          )}
        </form>
      )}
    </div>
  );
});
