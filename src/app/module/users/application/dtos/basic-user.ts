import { z } from 'zod';

export const basicUserSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .required();

export type BasicUserDto = z.infer<typeof basicUserSchema>;
