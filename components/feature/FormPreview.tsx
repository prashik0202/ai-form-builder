'use client';

import { useFormBuilder } from '@/context/FormBuilderContextProvider';
import React from 'react'
import DynamicForm from './DynamicForm';

const FormPreview = () => {

  const { savedForm } = useFormBuilder();

  return (
    <>
      {savedForm ? (
        <DynamicForm formFields={savedForm} />
      ) : (
        <h2>No form preview</h2>
      )}
    </>
  )
}

export default FormPreview