import { z } from 'zod';

export const ZApiPokemonsResponse = z.object({
	count: z.number().nonnegative().int(),
	next: z.string().nullable(),
	results: z.array(
		z.object({
			name: z.string(),
			url: z.string().url()
		})
	)
});

export type ApiPokemonsResponse = z.infer<typeof ZApiPokemonsResponse>;
