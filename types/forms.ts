export interface BaseForm {
  title: string;
  description? : string;
  submitButtonText: string;
  showResetButton: boolean;
  fields: FormFields[];
}

// till now we support text, email and password
export type FormFieldsTypes = "text" | "email" | "password"

export interface FormFields {
  name: string;
  label: string;
  type: FormFieldsTypes;
  placeholderText: string;
  helperText? : string;
  validations?: {
    minLengthVal?: {
      minLength: number;
      validationMessage: string;
    };
    maxLengthVal?: {
      maxLenght: number;
      validationMessage: string;
    };
    minNumberVal? : {
      minNumber: number;
      validationMessage: string
    };
    mqxNumberVal? : {
      maxNumber: number;
      validationMessage: string
    }
  }
}

export const LoginForm: BaseForm = {
  title: "Login to MetaInc.",
  submitButtonText: "Login",
  showResetButton: false,
  fields : [
    {
      name: "email",
      label: "Email Address",
      placeholderText: "Please enter your email",
      helperText: "please enter valid email address",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholderText: "Please enter your password",
      helperText: "please enter correct password",
      type: "password",
      validations: {
        minLengthVal: {
          minLength: 8,
          validationMessage: "Password must contain 8 character"
        },
        maxLengthVal: {
          maxLenght: 16,
          validationMessage: "Your password is too long!"
        }
      }
    }
  ]
}