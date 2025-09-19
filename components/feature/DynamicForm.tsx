'use client';

import { dynamicFormSchema } from '@/lib/dynamicSchema';
import { BaseForm } from '@/types/forms';
import React from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface DynamicFormProps {
  formFields: BaseForm;
}

const DynamicForm = ({ formFields }: DynamicFormProps) => {

  // generating zod schema dyanmically
  const schema = dynamicFormSchema(formFields.fields);

  // return the type of Schema
  type schemaType = z.infer<ReturnType<typeof dynamicFormSchema>>;

  // defacult  values
  const defaultValues = formFields.fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, { } as schemaType)

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  const handleFormSubmit = async (data: schemaType) => {
    try {
      console.log(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto rounded-lg shadow-md`}>
      <CardHeader>
        <CardTitle>
          {formFields.title}
        </CardTitle>
        {formFields.description && (
          <CardDescription>{formFields.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            {formFields.fields.map((formField) => {

              switch (formField.fieldType) {
                case "input":
                  return(
                    <FormField
                      key={formField.name}
                      control={form.control}
                      name={formField.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{formField.label}</FormLabel>
                          <FormControl>
                            <Input placeholder={formField.placeholderText} {...field} type={formField.type} />
                          </FormControl>
                          {formField.helperText && (
                            <FormDescription>
                              {formField.helperText}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                
                case "select":
                  return(
                    <FormField
                      key={formField.name}
                      control={form.control}
                      name={formField.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{formField.label}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {formField.options.map((option) => (
                                <SelectItem key={option.value} value={option.value as string}>{option.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formField.helperText && (
                            <FormDescription>
                              {formField.helperText}
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )
                
              }

            })}
            
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}

              >
                {form.formState.isSubmitting ? 'Loading...' : formFields.submitButtonText}
              </Button>
              
              {formFields.showResetButton && (
                <Button
                  variant={"outline"}
                  type="button"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default DynamicForm