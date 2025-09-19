import { google } from '@ai-sdk/google';
import { streamText, UIMessage, convertToModelMessages } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: `
      You have to generata a form schema based on the structure
      and that structure is 

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

      and just send JSON object in response 
      but if user send message other than genrating form your should able to response that
      i cannot answer this question tell me about genrating form for you.
    `,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}