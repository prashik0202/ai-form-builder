import { z } from "zod";

export const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  submitButtonText: z.string(),
  showResetButton: z.boolean(),
  fields: z.array(
    z.discriminatedUnion("fieldType", [
      // input field schema
      z.object({
        fieldType: z.literal("input"),
        name: z.string(),
        label: z.string(),
        type: z.enum(["text", "email", "password"]),
        placeholderText: z.string(),
        helperText: z.string().optional(),
        validations: z
          .object({
            minLengthVal: z
              .object({
                minLength: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
            maxLengthVal: z
              .object({
                maxLenght: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
            minNumberVal: z
              .object({
                minNumber: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
            mqxNumberVal: z
              .object({
                maxNumber: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
          })
          .optional(),
      }),

      // select field schema
      z.object({
        fieldType: z.literal("select"),
        name: z.string(),
        label: z.string(),
        type: z.literal("text"),
        placeholderText: z.string(),
        helperText: z.string().optional(),
        options: z.array(
          z.object({
            label: z.string(),
            value: z.union([z.string(), z.number()]),
          })
        ),
        validations: z
          .object({
            minLengthVal: z
              .object({
                minLength: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
            maxLengthVal: z
              .object({
                maxLenght: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
            minNumberVal: z
              .object({
                minNumber: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
            mqxNumberVal: z
              .object({
                maxNumber: z.number(),
                validationMessage: z.string(),
              })
              .optional(),
          })
          .optional(),
      }),
    ])
  ),
});
