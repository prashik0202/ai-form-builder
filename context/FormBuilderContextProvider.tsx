'use client';

import React, { createContext, useContext, useState } from 'react';
import { formSchemaType, FormFieldType } from '@/schema/formSchema';

type FormBuilderContextType = {
  fields: FormFieldType[];
  setFields: React.Dispatch<React.SetStateAction<FormFieldType[]>>;
  savedForm: formSchemaType | null;
  setSavedForm: React.Dispatch<React.SetStateAction<formSchemaType | null>>;
  resetBuilder: () => void;
};

const FormBuilderContext = createContext<FormBuilderContextType | undefined>(undefined);

export const FormBuilderContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [fields, setFields] = useState<FormFieldType[]>([]);
  const [savedForm, setSavedForm] = useState<formSchemaType | null>(null);

  const resetBuilder = () => {
    setFields([]);
    setSavedForm(null);
  };

  return (
    <FormBuilderContext.Provider
      value={{
        fields,
        setFields,
        savedForm,
        setSavedForm,
        resetBuilder,
      }}
    >
      {children}
    </FormBuilderContext.Provider>
  );
};

// ✅ Custom hook for cleaner imports
export const useFormBuilder = () => {
  const context = useContext(FormBuilderContext);
  if (!context) {
    throw new Error('useFormBuilder must be used within a FormBuilderContextProvider');
  }
  return context;
};
