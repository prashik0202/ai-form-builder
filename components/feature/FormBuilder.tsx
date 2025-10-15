'use client';
import { formSchemaType, InputFieldType, SelectFieldType } from '@/schema/formSchema'
import React, { useCallback, useState } from 'react'
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Edit2, Info, Plus, Trash } from 'lucide-react';
import FieldEditor from './FieldEditor';
import DynamicForm from './DynamicForm';

const FormBuilder = () => {

  const [formConfig, setFormConfig] = useState<formSchemaType>({
    title: "Form Title here",
    description: "Form Description here",
    showResetButton: false,
    submitButtonText: "Submit",
    fields: []
  });

  const [editingField, setEditingField] = useState<((InputFieldType | SelectFieldType) & { index: number }) | null>(null);
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

  const addField = useCallback((fieldType: "input" | "select") => {
    const newField = fieldType === 'input' ? { ...defaultInputFields } : { ...defaultSelectFields };
    setEditingField({
      ...newField,
      index: formConfig.fields.length
    });
    setShowFieldForm(true);
  },[editingField,showFieldForm])

  const editField = useCallback((index:number) => {
    setEditingField({ ...formConfig.fields[index], index});
    setShowFieldForm(true);
  },[editingField,showFieldForm])

  const deleteField = (index: number) => {
    setFormConfig({
      ...formConfig,
      fields: formConfig.fields.filter((_,i) => i !== index)
    });
  } 

  const onCloseFieldForm = useCallback(() => {
    setShowFieldForm(false);
    setEditingField(null);
  },[editingField,showFieldForm])

  const saveField = (field: (InputFieldType | SelectFieldType) & { index: number }) => {
    const { index, ...fieldData } = field;
    const newFields = [...formConfig.fields];

    if(index >= newFields.length) {
      newFields.push(fieldData);
    } else {
      newFields[index] = fieldData;
    }

    setFormConfig({...formConfig, fields: newFields});
    onCloseFieldForm();
  }

  return (
    <div className='flex flex-col md:flex-row w-full'>
      <div className='flex flex-col gap-4 w-full md:max-w-md'>
        <div className='p-4 rounded-md'>
          <span className='text-lg my-2'>Form Settings</span>
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
            {showFieldForm && (
              <FieldEditor
                field={editingField}
                onClose={onCloseFieldForm}
                onSave={saveField}
              />
            )}
            <div>
              {formConfig.fields.length === 0 ? (
                <div className='bg-accent p-2 rounded-md'>
                  <p className='text-sm text-muted-foreground flex items-center gap-2'>
                  <Info className='w-4 h-4' /> No field added yet. Click on the button above to add field.
                  </p>
                </div>
              ) : (
                <div className='flex flex-col gap-1 h-96 overflow-auto'>
                  {formConfig.fields.map((field,index) => (
                    <div key={index} className='flex flex-col gap-1 bg-accent p-3 rounded-md'>
                      <div className='flex justify-between gap-2 items-center'>
                        <span className='text-sm'>{field.type}</span>
                        <div className='flex gap-2 items-center'>
                          <Button 
                            variant={"ghost"} 
                            size={"icon"}
                            onClick={() => editField(index)}
                          >
                            <Edit2 className='h-3 w-3'/>
                          </Button>
                          <Button 
                            variant={"ghost"} 
                            size={"icon"}
                            onClick={() => deleteField(index)}
                          >
                            <Trash className='h-3 w-3'/>
                          </Button>
                        </div>
                      </div>
                      <div>
                        <span className='text-xs'>{field.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center w-full h-fit'>
        <DynamicForm formFields={formConfig}/>
      </div>
    </div>
  )
}

export default FormBuilder