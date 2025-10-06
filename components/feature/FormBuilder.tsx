'use client';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormFieldType, formSchemaType } from '@/schema/formSchema';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { RefreshCcwIcon, Trash2 } from 'lucide-react';
import FieldEditor from './FieldEditor';
import { useFormBuilder } from '@/context/FormBuilderContextProvider';

const FormBuilder = React.memo(() => {
  console.log("formBuilder render")
  // const [ fields, setFields] = React.useState<FormFieldType[]>([]);
  const { fields, setFields, setSavedForm } = useFormBuilder();

  const form = useForm<Omit<formSchemaType, "fields">>({
    defaultValues: {
      title: "",
      description: "",
      submitButtonText: "",
      showResetButton: false,
    }
  });

  const addField = React.useCallback((field: FormFieldType) => {
    setFields((prev) => [...prev, field]);
  }, [setFields]);

  const onSubmit = (data: Omit<formSchemaType, "fields">) => {
    const fullForm = {
      ...data,
      fields
    }
    setSavedForm(fullForm);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Form Settings</CardTitle>
        <CardDescription>
          Edit your fom metadata
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col gap-2 w-ful'>
              <Label>Title</Label>
              <Input
                {...form.register("title")}
                placeholder='Form title'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <Label>Description</Label>
              <Input
                {...form.register("description")}
                placeholder='Form description'
              />
            </div>
            <div className='flex flex-col gap-2 w0-full'>
              <Label>Subit Button Text</Label>
              <Input
                {...form.register("submitButtonText")}
                placeholder='eg. submit, Contin'
              />
            </div>
            <div className='flex items-center gap-3 justify-start'>
              <Controller
                name="showResetButton"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label htmlFor="showResetButton">Show Reset Button</label>
                  </div>
                )}
              />
            </div>
            <Button type='button' onClick={() => form.reset()} variant={"ghost"} size={"icon"}>
              <RefreshCcwIcon />
            </Button>
          </div>

          <div className='border col-span-2 my-2' />

          <div className='col-span-2'>
            <h2 className='text-md font-semibold mb-4'>Fields</h2>
            <div>
              {fields.length === 0 && (
                <h3 className='text-muted-foreground text-sm'>No fields added yet</h3>
              )}
              <ul className="space-y-2">
                {fields.length > 0 && fields.map((field, idx) => (
                  <li
                    key={idx}
                    className="border rounded p-3 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{field.label}</p>
                      <p className="text-sm text-gray-600">{field.fieldType}</p>
                    </div>
                    <Button
                      type="button"
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() =>
                        setFields(fields.filter((_, i) => i !== idx))
                      }
                    > 
                      <Trash2 className='text-red-400'/>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <FieldEditor
            onAddField={addField}
          />
          
          <div className='border my-2'/>
          <Button className='w-full md:w-fit'>Save Form</Button>

        </form>
      </CardContent>
    </Card>
  )
})

export default FormBuilder