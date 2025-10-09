'use client';

import React, { useEffect, useState } from 'react'
import { InputFieldType, SelectFieldType } from '@/schema/formSchema'
import { Button } from '../ui/button';
import { Plus, Save, Trash, X } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';

interface FieldEditorProps {
  field: ((InputFieldType | SelectFieldType) & { index: number }) | null;
  onClose: () => void;
  onSave: (field: (InputFieldType | SelectFieldType) & { index: number }) => void;
}

const FieldEditor = ({ field, onClose, onSave}: FieldEditorProps) => {

  const [editedField, setEditedField] = useState(field);

  useEffect(() => {
    setEditedField(field);
  },[field])

  const updateField = (key:string, value: string | number) => {
    if (editedField) {
      setEditedField({ ...editedField, [key]: value });
    }
  }

  //select field handling
  const addOption = () => {
    if(editedField?.fieldType === 'select') {
      const newOption = [...(editedField.options || []), { label: '', value: ''}];
      setEditedField({...editedField, options: newOption});
    }
  }

  const updateOption = (index: number, key: "label" | "value", value: string | number) => {
    if(editedField?.fieldType === 'select') {
      const newOptions = [...editedField.options];
      newOptions[index][key] = String(value);
      setEditedField({ ...editedField, options: newOptions });
    }
  }

  const deleteOption = (index: number) => {
    if(editedField?.fieldType === 'select') {
      const newOptions = editedField.options.filter((_,i) => i !== index);
      setEditedField({ ...editedField, options: newOptions});
    }  
  }

  return (
    <div className='w-full bg-accent p-3 rounded-md'>
      <div className='flex items-center justify-between'>
        <h2 className='text-md font-semibold'>{editedField!.index >= field!.index ? "Add" : "Edit"} {editedField?.fieldType} Field</h2>
        <div className='flex flex-row items-center gap-2'>
          <Button variant={"ghost"} onClick={onClose}><X /></Button>
          <Button
            variant={"ghost"}
            onClick={() => {
              if (editedField) onSave(editedField);
            }}
            disabled={!editedField}
          >
            <Save />
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-4'>
        <div className='flex flex-col gap-2'>
          <Label>Field Name*</Label>
          <Input 
            type='text'
            value={editedField?.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder='field name'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Label*</Label>
          <Input 
            type='text'
            value={editedField?.label}
            onChange={(e) => updateField("label", e.target.value)}
            placeholder='label'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Placeholder text</Label>
          <Input 
            type='text'
            value={editedField?.placeholderText}
            onChange={(e) => updateField("placeholderText", e.target.value)}
            placeholder='label'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>Helper text</Label>
          <Input 
            type='text'
            value={editedField?.helperText}
            onChange={(e) => updateField("helperText", e.target.value)}
            placeholder='label'
          />
        </div>

        {editedField?.fieldType === "input" && (
          <div className='flex flex-col gap-2'>
            <Label>Input Type</Label>
            <Select
              value={editedField.type}
              onValueChange={(value) => updateField("type", value)}
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder="select field type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='text'>Text</SelectItem>
                <SelectItem value='email'>Email</SelectItem>
                <SelectItem value='password'>Password</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {editedField?.fieldType === 'select' && (
          <div className='col-span-2 flex flex-col'>
            <div className='flex items-center gap-2 justify-between'>
              <span className='text-sm font-semibold'>Add Option</span>
              <Button variant={"ghost"} onClick={addOption}><Plus /> Add</Button>
            </div>
            <div className='space-y-2'>
              {editedField.options?.map((option, index) => (
                <div className='flex items-center gap-2' key={index}>
                  <Input 
                    type='text'
                    value={option.label}
                    onChange={(e) => updateOption(index,"label", e.target.value)}
                    placeholder='Label'
                  />
                  <Input 
                    type='text'
                    value={option.value}
                    onChange={(e) => updateOption(index,"value", e.target.value)}
                    placeholder='Value'
                  />
                  <Button onClick={() => deleteOption(index)}><Trash /></Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default FieldEditor