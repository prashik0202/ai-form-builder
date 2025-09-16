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
  title: "Create your Account",
  submitButtonText: "Login",
  showResetButton: false,
  fields : [
    {
      name: "firstName",
      label: "First Name",
      placeholderText: "John",
      helperText: "please enter your first name",
      type: "text",
      validations: {
        minLengthVal: {
          minLength: 3,
          validationMessage: "Name must contain atlest 3 character"
        },
        maxLengthVal: {
          maxLenght: 16,
          validationMessage: "first name should not be more than 16 character"
        }
      }
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholderText: "Doe",
      helperText: "please enter your last name",
      type: "text",
    },
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