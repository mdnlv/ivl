import React, { useState } from 'react';
import './App.css';
import { useFormik } from 'formik';
import Fields from './components/Fields';
import * as Yup from 'yup';

function App() {
  const [isSubmit, setIsSubmit] = useState(false);
  const formik = useFormik({
    initialValues: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      telegram: undefined,
      gender: undefined,
      police: false
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Допустимо не более 15 букв')
        .required('Обязательное поле'),
      lastName: Yup.string()
        .max(20, 'Допустимо не более 20 букв')
        .required('Обязательное поле'),
      email: Yup.string()
        .email('Неверный электронный адрес')
        .required('Обязательное поле'),
      telegram: Yup.string()
        .required('Обязательное поле'),
      gender: Yup.string()
        .required('укажите пол'),
      police: Yup.boolean(true)
        .required('Необходимо принять согласие')
        .oneOf([true], 'Необходимо принять согласие'),
    }),
    onSubmit: values => {
      setIsSubmit(true);
      formik.resetForm();
    },
  });

  return (
    <div className="App">
      <form className={'patient-search-filter-form'}>
        <Fields formik={formik} isSubmit={isSubmit} setIsSubmit={setIsSubmit}/>
      </form>
    </div>
  );
}

export default App;
