'use client';
import { formSchemaType, InputFieldType, SelectFieldType } from '@/schema/formSchema'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

const FormBuilder = () => {

  const [formConfig, setFormConfig] = useState<formSchemaType>({
    title: "Form Title",
    description: "",
    showResetButton: false,
    submitButtonText: "Submit",
    fields: []
  });

  const [editingField, setEditingField] = useState<formSchemaType["fields"] & { index: number}>();
  const [showFieldForm, setShowFieldForm] = useState<boolean>(false);

  const defaultInputFields: InputFieldType = {
    fieldType: "input",
    label: "",
    name: "",
    type: "text",
    placeholderText: "",
    helperText: "",
    validations: {}
  }

  const defaultSelectFields: SelectFieldType = {
    fieldType: "select",
    label: "",
    name: "",
    options: [],
    placeholderText: "Select an Option",
    helperText: "",
    type: "text",
    validations: {}
  }

  const addField = (fieldType: "input" | "select") => {
    const newField = fieldType === 'input' ? { ...defaultInputFields} : { defaultSelectFields};
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-accent p-4 rounded-md'>
        <span className='text-md my-2'>Form Settings</span>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
          <div className='flex flex-col gap-2'>
            <Label>Form Title</Label>
            <Input 
              type="text" 
              value={formConfig.title}
              placeholder='Provide Form Title'
              onChange={(e) => setFormConfig({ ...formConfig, title: e.target.value})}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Submit Button Text</Label>
            <Input 
              type="text" 
              value={formConfig.submitButtonText}
              placeholder='Submit Button Text'
              onChange={(e) => setFormConfig({ ...formConfig, submitButtonText: e.target.value})}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <Label>Form Description</Label>
            <Input 
              type="text" 
              value={formConfig.description}
              placeholder='Submit Button Text'
              onChange={(e) => setFormConfig({ ...formConfig, description: e.target.value})}
            />
          </div>
          <div className='flex items-center gap-2'>
            <Label>Show reset button on form</Label>
            <Checkbox 
              checked={formConfig.showResetButton} 
              onCheckedChange={(checked) =>
                setFormConfig({ ...formConfig, showResetButton: !!checked })
              }
            />
          </div>
        </div>
        <div className='flex flex-col gap-3 my-2'>
          <span className='text-md'>Form Fields</span>
          <div className='flex flex-wrap gap-2'>
            <Button 
              variant={"outline"}
              onClick={() => addField("input")}
            >
              <Plus /> Input Field
            </Button>
            <Button 
              variant={"outline"}
              onClick={() => addField("select")}
            >
              <Plus /> Select Field
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormBuilder