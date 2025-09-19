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
          "maxLenght": 100,
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
          "maxLenght": 500,
          "validationMessage": "Feedback cannot exceed 500 characters."
        }
      }
    }
  ]
}



// export const RegisterForm: BaseForm = {
//   title: "Create Your Account",
//   description: "Join us today! Fill out the form below to get started.",
//   submitButtonText: "Register",
//   showResetButton: true, // It's often helpful to have a reset button on registration forms
//   fields : [
//     {
//       name: "firstName",
//       label: "First Name",
//       placeholderText: "John",
//       helperText: "Please enter your first name.",
//       type: "text",
//       fieldType: "input",
//       validations: {
//         minLengthVal: {
//           minLength: 2,
//           validationMessage: "First name must be at least 2 characters."
//         },
//         maxLengthVal: {
//           maxLenght: 50, // Corrected typo: maxLength
//           validationMessage: "First name cannot exceed 50 characters."
//         }
//       }
//     },
//     {
//       name: "lastName",
//       label: "Last Name",
//       placeholderText: "Doe",
//       helperText: "Please enter your last name.",
//       type: "text",
//       fieldType: "input",
//       validations: {
//         minLengthVal: {
//           minLength: 2,
//           validationMessage: "Last name must be at least 2 characters."
//         },
//         maxLengthVal: {
//           maxLenght: 50, // Corrected typo: maxLength
//           validationMessage: "Last name cannot exceed 50 characters."
//         }
//       }
//     },
//     {
//       name: "email",
//       label: "Email Address",
//       placeholderText: "john.doe@example.com",
//       helperText: "We'll send important updates to this email.",
//       type: "email",
//       fieldType: "input"
//     },
//     {
//       name: "password",
//       label: "Password",
//       placeholderText: "Enter your password",
//       helperText: "Password must be 8-16 characters long and include numbers and special characters.",
//       type: "password",
//       fieldType: "input",
//       validations: {
//         minLengthVal: {
//           minLength: 8,
//           validationMessage: "Password must be at least 8 characters long."
//         },
//         maxLengthVal: {
//           maxLenght: 16, // Corrected typo: maxLength
//           validationMessage: "Password cannot exceed 16 characters."
//         }
//       }
//     },
//     {
//       name: "confirmPassword",
//       label: "Confirm Password",
//       placeholderText: "Re-enter your password",
//       helperText: "Please re-enter your password to confirm.",
//       type: "password",
//       fieldType: "input",
//       validations: {
//         minLengthVal: {
//           minLength: 8,
//           validationMessage: "Password must be at least 8 characters long."
//         },
//         maxLengthVal: {
//           maxLenght: 16, // Corrected typo: maxLength
//           validationMessage: "Password cannot exceed 16 characters."
//         }
//         // Note: Cross-field validation (e.g., password and confirmPassword matching)
//         // is typically handled by the form component's logic, not directly in this schema structure.
//       }
//     },
//     {
//       name: "role",
//       label: "User Role",
//       type: "text",
//       fieldType: "select",
//       placeholderText: "Select your role",
//       options: [
//         { label: "Standard User", value: "standard_user" },
//         { label: "Premium User", value: "premium_user" },
//         { label: "Guest", value: "guest" }
//       ]
//     }
//   ]
// };

export const RegisterForm: BaseForm = {
  title: "Create Your Account",
  description: "Join us today! Fill out the form below to get started.",
  submitButtonText: "Register",
  showResetButton: true, // It's often helpful to have a reset button on registration forms
  fields : [
    {
      name: "firstName",
      label: "First Name",
      placeholderText: "John",
      helperText: "Please enter your first name.",
      type: "text",
      fieldType: "input",
      validations: {
        minLengthVal: {
          minLength: 2,
          validationMessage: "First name must be at least 2 characters."
        },
        maxLengthVal: {
          maxLenght: 50, // Corrected typo: maxLength
          validationMessage: "First name cannot exceed 50 characters."
        }
      }
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholderText: "Doe",
      helperText: "Please enter your last name.",
      type: "text",
      fieldType: "input",
      validations: {
        minLengthVal: {
          minLength: 2,
          validationMessage: "Last name must be at least 2 characters."
        },
        maxLengthVal: {
          maxLenght: 50, // Corrected typo: maxLength
          validationMessage: "Last name cannot exceed 50 characters."
        }
      }
    },
    {
      name: "email",
      label: "Email Address",
      placeholderText: "john.doe@example.com",
      helperText: "We'll send important updates to this email.",
      type: "email",
      fieldType: "input"
    },
    {
      name: "password",
      label: "Password",
      placeholderText: "Enter your password",
      helperText: "Password must be 8-16 characters long and include numbers and special characters.",
      type: "password",
      fieldType: "input",
      validations: {
        minLengthVal: {
          minLength: 8,
          validationMessage: "Password must be at least 8 characters long."
        },
        maxLengthVal: {
          maxLenght: 16, // Corrected typo: maxLength
          validationMessage: "Password cannot exceed 16 characters."
        }
      }
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      placeholderText: "Re-enter your password",
      helperText: "Please re-enter your password to confirm.",
      type: "password",
      fieldType: "input",
      validations: {
        minLengthVal: {
          minLength: 8,
          validationMessage: "Password must be at least 8 characters long."
        },
        maxLengthVal: {
          maxLenght: 16, // Corrected typo: maxLength
          validationMessage: "Password cannot exceed 16 characters."
        }
        // Note: Cross-field validation (e.g., password and confirmPassword matching)
        // is typically handled by the form component's logic, not directly in this schema structure.
      }
    },
    {
      name: "role",
      label: "User Role",
      type: "text",
      fieldType: "select",
      placeholderText: "Select your role",
      options: [
        { label: "Standard User", value: "standard_user" },
        { label: "Premium User", value: "premium_user" },
        { label: "Guest", value: "guest" }
      ]
    }
  ]
};