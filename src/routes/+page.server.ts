import { queryPokemonsPages } from '../utils/api/pokemon';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const [pokemons, nextPage] = await queryPokemonsPages(1, fetch);
	return { pokemons, nextPage };
}) satisfies PageServerLoad;
