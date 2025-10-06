import { FieldFormType, FormFieldType } from '@/schema/formSchema'
import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface FieldEditorProps {
  onAddField: (field: FormFieldType) => void
}

const FieldEditor = React.memo(({ onAddField } : FieldEditorProps) => {
  console.log("FieldEditor Render")
  const [showForm,setShowForm] = React.useState(false);

  const { register, handleSubmit, control, reset, watch, setValue } = useForm<FieldFormType>({
    defaultValues: {
      fieldType: "input",
      options: []
    }
  });

  const { fields, append, remove } = useFieldArray<FieldFormType, "options">({
    control,
    name: "options" as "options",
  });

  const onSubmit = (data: any) => {
    if (data.fieldType === "input") {
      const field: FormFieldType = {
        fieldType: "input",
        name: data.name,
        label: data.label,
        type: data.type,
        placeholderText: data.placeholderText,
        helperText: data.helperText,
      };
      onAddField(field);
    } else if (data.fieldType === "select") {
      const field: FormFieldType = {
        fieldType: "select",
        name: data.name,
        label: data.label,
        type: "text",
        placeholderText: data.placeholderText,
        helperText: data.helperText,
        options: data.options ?? [],
      };
      onAddField(field);
    }

    reset();
    setShowForm(false);
  };

  const selectedFieldType = watch("fieldType")

  return (
    <div className="my-4">
      {!showForm && (
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => setShowForm(true)}
        >
          Add Field <Plus />
        </Button>
      )}

      {showForm && (
        <div className="border rounded-lg shadow-lg p-5 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Field Type */}
          <Controller 
            control={control}
            name='fieldType'
            render={({field}) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Field Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="input">Input</SelectItem>
                    <SelectItem value="select">Select</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {/* Common Fields */}
          <Input 
            {...register("label")}
            placeholder='Label'
          />

          <Input 
            {...register("name")}
            placeholder='Name'
          />

          <Input 
            {...register("placeholderText")}
            placeholder='Placeholder'
          />

          {/* --- Input type --- */}
          {selectedFieldType === "input" && (
            <div className='flex flex-col gap-2'>
              <Label className="block font-medium">Input Type</Label>
              <Controller 
                control={control}
                name='type'
                render={({field}) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Field Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="password">Password</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          )}

          {/* --- Select options --- */}
          {selectedFieldType === "select" && (
            <div className='col-span-2'>
              <h4 className="font-medium mb-1">Options</h4>
              {fields.map((option, index) => (
                <div key={option.id} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Label"
                    {...register(`options.${index}.label` as const)}
                    className='w-full'
                  />
                  <Input
                    placeholder="Value"
                    {...register(`options.${index}.value` as const)}
                    className="w-full"
                  />
                  <Button
                    type="button"
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => remove(index)}
                  >
                    <X className='text-red-400'/>
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => append({ label: "", value: "" })}
                size={"sm"}
              >
                + Add Option
              </Button>
            </div>
          )}

          <div className='border col-span-2'/>

          <div className="flex col-span-2 gap-3"> 
            <Button
              type='button'
              variant={"ghost"}
              onClick={handleSubmit(onSubmit)}
            >
              <Plus />Add Field
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              size={"sm"}
              onClick={() => {
                setShowForm(false);
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
})

export default FieldEditor