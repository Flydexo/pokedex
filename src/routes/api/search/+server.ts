import { getAllPokemonNames, searchPokemon } from '../../../utils/api/cache';
import type { RequestHandler } from './$types';

export const GET = (async ({ url, fetch }) => {
	const name = url.searchParams.get('q');

	await getAllPokemonNames(fetch);

	if (!name) {
		return new Response(JSON.stringify([]));
	}

	const list = await searchPokemon(name, fetch);

	return new Response(JSON.stringify(list));
}) satisfies RequestHandler;
