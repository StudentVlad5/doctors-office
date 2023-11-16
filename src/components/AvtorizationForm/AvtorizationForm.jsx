import { useState } from 'react';
import {
    AvtorizationSection, AvtorizationContainer, AvtorizationFormItem, Titleline, Input, ButtonSubmit
  } from './AvtorizationForm.styled';
import { saveToStorage } from 'services/localStorService';

  
  export const AvtorizationForm = () => {
    const [avtorization_id, setAvtorization_id] = useState('');

    const handleSubmit = () => {
        saveToStorage("avtorization_id", avtorization_id);
        setAvtorization_id('');
    }

    return (
      <AvtorizationSection>
        <AvtorizationContainer>
            <AvtorizationFormItem onSubmit={handleSubmit}>
                <Titleline for="avtorization_id" aria-label="avtorization_id">Авторизация</Titleline>
                <Input type="text" 
                    id="avtorization_id" 
                    name="avtorization_id" 
                    value={avtorization_id} 
                    placeholder="Введите идентификатор"
                    onChange={e => {setAvtorization_id(e.target.value)}}/>
                <ButtonSubmit type="submit" aria-label="Submit">ВХОД</ButtonSubmit>
            </AvtorizationFormItem>
        </AvtorizationContainer>
      </AvtorizationSection>
    );
  };
  