import { z, ZodType } from 'zod';

export class TodoValidation {
  static readonly CREATE: ZodType = z.object({
    checklist: z.boolean().default(false).optional(),
    todoname: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().min(1).positive(),
    checklist: z.boolean().default(false).optional(),
    todoname: z.string().min(1).max(100),
  });
}
