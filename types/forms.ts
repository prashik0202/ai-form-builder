export interface BaseForm {
  title: string;
  description? : string;
  submitButtonText: string;
  showResetButton: boolean;
  fields: FormFields[];
}

// till now we support text, email and password
export type FormFieldsTypes = "text" | "email" | "password"
export type FieldType = "input" | "select";

interface BaseField {
  name: string;
  label: string;
  type: FormFieldsTypes;
  fieldType: FieldType;
  placeholderText: string;
  helperText? : string;
  validations?: {
    minLengthVal?: {
      minLength: number;
      validationMessage: string;
    };
    maxLengthVal?: {
      maxLength: number;
      validationMessage: string;
    };
    minNumberVal? : {
      minNumber: number;
      validationMessage: string
    };
    maxNumberVal? : {
      maxNumber: number;
      validationMessage: string
    }
  }
}

export interface InputField extends BaseField{
  fieldType: "input",
  type: FormFieldsTypes
}

export interface SelectField extends BaseField {
  fieldType: "select";
  type: "text"; // usually select returns strings
  options: { label: string; value: string | number }[];
}

export type FormFields = InputField | SelectField;

export const LoginForm: BaseForm = {
  "title": "User Feedback Form",
  "description": "We value your opinion! Please share your feedback to help us improve.",
  "submitButtonText": "Submit Feedback",
  "showResetButton": true,
  "fields": [
    {
      "fieldType": "input",
      "name": "email",
      "label": "Your Email (Optional)",
      "type": "email",
      "placeholderText": "Enter your email address",
      "helperText": "We may contact you regarding your feedback.",
      "validations": {
        "maxLengthVal": {
          "maxLength": 100,
          "validationMessage": "Email address cannot exceed 100 characters."
        }
      }
    },
    {
      "fieldType": "select",
      "name": "rating",
      "label": "Overall Satisfaction",
      "type": "text",
      "placeholderText": "Select your satisfaction level",
      "helperText": "How satisfied are you with our service/product?",
      "options": [
        { "label": "Very Satisfied", "value": "5" },
        { "label": "Satisfied", "value": "4" },
        { "label": "Neutral", "value": "3" },
        { "label": "Dissatisfied", "value": "2" },
        { "label": "Very Dissatisfied", "value": "1" }
      ]
    },
    {
      "fieldType": "input",
      "name": "comments",
      "label": "Your Comments",
      "type": "text",
      "placeholderText": "Please provide your detailed feedback or suggestions here...",
      "helperText": "Feel free to be specific!",
      "validations": {
        "minLengthVal": {
          "minLength": 10,
          "validationMessage": "Please provide at least 10 characters for your feedback."
        },
        "maxLengthVal": {
          "maxLength": 500,
          "validationMessage": "Feedback cannot exceed 500 characters."
        }
      }
    }
  ]
}

export const DummyFormFields: BaseForm = {
  "title": "User Details Form",
  "description": "Please fill in your personal information below.",
  "submitButtonText": "Submit",
  "showResetButton": true,
  "fields": [
    {
      "fieldType": "input",
      "name": "name",
      "label": "Full Name",
      "type": "text",
      "placeholderText": "e.g. John Doe",
      "helperText": "Enter your first and last name.",
      "validations": {
        "minLengthVal": {
          "minLength": 3,
          "validationMessage": "Name must be at least 3 characters long."
        }
      }
    },
    {
      "fieldType": "input",
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "placeholderText": "e.g. john.doe@example.com",
      "helperText": "Enter a valid email address.",
      "validations": {
        "minLengthVal": {
          "minLength": 5,
          "validationMessage": "Email must be at least 5 characters long."
        }
      }
    },
    {
      "fieldType": "input",
      "name": "phoneNumber",
      "label": "Phone Number",
      "type": "text",
      "placeholderText": "e.g. +1 (555) 123-4567",
      "helperText": "Enter your contact phone number.",
      "validations": {
        "minLengthVal": {
          "minLength": 10,
          "validationMessage": "Phone number must be at least 10 digits."
        }
      }
    },
    {
      "fieldType": "input",
      "name": "address",
      "label": "Address",
      "type": "text",
      "placeholderText": "e.g. 123 Main St, Anytown, USA",
      "helperText": "Enter your full residential address.",
      "validations": {
        "minLengthVal": {
          "minLength": 10,
          "validationMessage": "Address must be at least 10 characters long."
        }
      }
    }
  ]
}
;