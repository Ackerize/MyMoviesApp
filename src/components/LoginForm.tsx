import axios from 'axios';
import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';

import validator from 'validator';
import authDB from '../api/authDB';
import {MovieContext} from '../context/MovieContext';
import {
  LoginData,
  LoginError,
  LoginResponse,
} from '../interfaces/loginInterface';
import Button from './Button';

const initialState = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const [formData, setFormData] = useState<LoginData>(initialState);
  const [formError, setFormError] = useState<LoginError>({
    email: false,
    password: false,
  });

  const {updateToken} = useContext(MovieContext);

  const onChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: string,
  ): void => {
    setFormData({...formData, [type]: e.nativeEvent.text});
  };

  const login = async () => {
    let errors = {
      email: false,
      password: false,
    };
    if (
      validator.isEmpty(formData.email) ||
      validator.isEmpty(formData.password)
    ) {
      if (validator.isEmpty(formData.email)) errors.email = true;
      if (validator.isEmpty(formData.password)) errors.password = true;
    } else if (!validator.isEmail(formData.email)) {
      errors.email = true;
    } else {
      try {
        const {
          data: {token},
        } = await authDB.post<LoginResponse>('/login', formData);
        updateToken(token);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          // 👇️ error: AxiosError<any, any>
          return error.message;
        } else {
          console.log('unexpected error: ', error);
          return 'An unexpected error occurred';
        }
      }
    }
    setFormError(errors);
  };

  return (
    <>
      <TextInput
        style={[styles.input, formError.email && styles.error]}
        placeholder="Email"
        placeholderTextColor="#969696"
        onChange={e => onChange(e, 'email')}
        value={formData.email}
      />
      <TextInput
        style={[styles.input, formError.password && styles.error]}
        placeholder="Password"
        placeholderTextColor="#969696"
        secureTextEntry={true}
        onChange={e => onChange(e, 'password')}
        value={formData.password}
      />
      <Button title="Login" onPress={login} />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  input: {
    height: 50,
    color: '#000',
    width: '80%',
    marginBottom: 25,
    paddingHorizontal: 20,
    borderRadius: 50,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#1e3040',
  },
  register: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
  },
  error: {
    borderColor: '#940c0c',
  },
});
