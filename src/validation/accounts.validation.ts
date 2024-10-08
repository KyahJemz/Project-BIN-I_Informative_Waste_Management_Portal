import { z } from 'zod';

export type ICreateAccountRequest = z.infer<typeof CreateAccountRequestSchema>
export const CreateAccountRequestSchema = z.object({
	firstName: z.string().min(1).trim(),
	lastName: z.string().min(1).trim(),
	position: z.string().trim().nullable().default(null),
	department: z.string().trim().nullable().default(null),
	email: z.string().min(1).email(),
	type: z.string().min(1).trim(),
	password: z.string().min(8).trim(),
});

export type IUpdateAccountRequest = z.infer<typeof UpdateAccountRequestSchema>
export const UpdateAccountRequestSchema = z.object({
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	position: z.string().optional().nullable(),
	department: z.string().optional().nullable(),
	email: z.string().email().optional(),
	type: z.string().optional(),
	token: z.string().optional(),
	password: z.string().min(8).optional(),
});

export type IChangeAccountPasswordRequest = z.infer<typeof ChangeAccountPasswordRequestSchema>
export const ChangeAccountPasswordRequestSchema = z
	.object({
		oldPassword: z.string().min(8),
		newPassword: z.string().min(8),
	})
	.refine((data) => data.oldPassword !== data.newPassword, {
		message: 'New password must be different from the old password',
		path: ['newPassword'],
	});

export type ILoginRequest = z.infer<typeof LoginRequestSchema>
export const LoginRequestSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});
