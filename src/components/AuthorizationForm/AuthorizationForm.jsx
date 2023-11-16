import { useState } from 'react';
import {
    AuthorizationSection, AuthorizationContainer, AuthorizationFormItem, Titleline, Input, ButtonSubmit
  } from './AuthorizationForm.styled';
import { saveToStorage } from 'services/localStorService';

  
  export const AuthorizationForm = () => {
    const [Authorization_id, setAuthorization_id] = useState('');

    const handleSubmit = () => {
        saveToStorage("Authorization_id", Authorization_id);
        setAuthorization_id('');
    }

    return (
      <AuthorizationSection>
        <AuthorizationContainer>
            <AuthorizationFormItem onSubmit={handleSubmit}>
                <Titleline for="Authorization_id" aria-label="Authorization_id">Авторизация</Titleline>
                <Input type="text" 
                    id="Authorization_id" 
                    name="Authorization_id" 
                    value={Authorization_id} 
                    placeholder="Введите идентификатор"
                    onChange={e => {setAuthorization_id(e.target.value)}}/>
                <ButtonSubmit type="submit" aria-label="Submit">ВХОД</ButtonSubmit>
            </AuthorizationFormItem>
        </AuthorizationContainer>
      </AuthorizationSection>
    );
  };
  