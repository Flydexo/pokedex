import { z } from 'zod';

export const ZPokemon = z.object({
	name: z.string(),
	sprites: z.object({
		other: z.object({
			'official-artwork': z.object({
				front_default: z.string().url().nullable()
			})
		})
	}),
	types: z.array(
		z.object({
			slot: z.number(),
			type: z.object({
				name: z.string(),
				url: z.string().url()
			})
		})
	)
});

export type IPokemon = z.infer<typeof ZPokemon>;
