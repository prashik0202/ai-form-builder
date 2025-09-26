import { FormFields } from "@/types/forms";
import {z, ZodType } from "zod";

export function dynamicFormSchema(fieldDefinations: FormFields[]) {
  const schemaFields: Record<string, ZodType<any>> = {};

  fieldDefinations.forEach((field) => {
    let fieldSchema: z.ZodType<any>;

    switch(field.type) {
      case "text":
      case "password":
        fieldSchema = z.string()
        break;
      case "email":
        fieldSchema = z.string().email();
        break;
      default:
        fieldSchema = z.any();
    }

    if(field.validations){
      if(field.validations.minLengthVal && fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(field.validations.minLengthVal.minLength,field.validations.minLengthVal.validationMessage )
      }

      if(field.validations.maxLengthVal && fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.max(field.validations.maxLengthVal.maxLength,field.validations.maxLengthVal.validationMessage )
      }
    }

    schemaFields[field.name] = fieldSchema;
  });

  return z.object(schemaFields);
}