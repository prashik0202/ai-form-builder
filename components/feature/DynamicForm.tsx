'use client';

import { dynamicFormSchema } from '@/lib/dynamicSchema';
import { BaseForm } from '@/types/forms';
import React from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

interface DynamicFormProps {
  formFields: BaseForm;
}

const DynamicForm = ({ formFields }: DynamicFormProps) => {

  const schema = dynamicFormSchema(formFields.fields);

  type schemaType = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    mode: "onChange"
  });

  const handleFormSubmit = async (data: schemaType) => {
    try {
      console.log(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className={`w-xl mx-auto bg-white p-6 rounded-lg shadow-md`}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{formFields.title}</h2>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {formFields.fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <label 
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            
            <input
              id={field.name}
              type={field.type}
              placeholder={field.placeholderText}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors[field.name] ? 'border-red-500' : 'border-gray-300'
              }`}
              {...register(field.name)}
            />
            
            {/* Helper text */}
            {field.helperText && !errors[field.name] && (
              <p className="text-xs text-gray-500">{field.helperText}</p>
            )}
            
            {/* Error message */}
            {errors[field.name] && (
              <p className="text-xs text-red-600">
                {errors[field.name]?.message as string}
              </p>
            )}
          </div>
        ))}
        
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Loading...' : formFields.submitButtonText}
          </button>
          
          {formFields.showResetButton && (
            <button
              type="button"
              onClick={() => alert('reset')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default DynamicForm