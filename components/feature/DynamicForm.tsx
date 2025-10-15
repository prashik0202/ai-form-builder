'use client';
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import z from 'zod';

import { dynamicFormSchema } from '@/lib/dynamicSchema';
import { BaseForm } from '@/types/forms';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface DynamicFormProps {
  formFields: BaseForm;
}

const DynamicForm = React.memo(({ formFields }: DynamicFormProps) => {

  // generating zod schema dyanmically
  const schema = dynamicFormSchema(formFields.fields);

  // return the type of Schema
  type schemaType = z.infer<ReturnType<typeof dynamicFormSchema>>;

  // default  values
  const defaultValues = formFields.fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, { } as schemaType)

  console.log(defaultValues);

  const form = useForm<schemaType>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues
  });

  React.useEffect(() => {
    form.reset(defaultValues);
  }, [formFields]); // Add form.reset to deps if needed

  const handleFormSubmit = async (data: schemaType) => {
    try {
      toast.success(
        <div className='flex flex-col gap-1 bg-accent w-full p-3 rounded-md'>
          {Object.entries(data).map(([key,value]) => (
            <div key={key} className='flex flex-row gap-5 justify-between'>
              <span className='font-medium'>{key} : </span>
              <span className='font-light'>{value}</span>
            </div>
          ))}
        </div>, {
        action: {
          label: "Ok",
          onClick: () => console.log(data)
        },
      })
      form.reset();
    } catch (error) {
      if(error instanceof Error) {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Card className={`w-full max-w-md mx-auto rounded-lg shadow-md max-h-[800px] overflow-y-auto`}>
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
                                <SelectValue placeholder={formField.placeholderText} />
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
});

export default DynamicForm