import type { IPokemon } from '../../types/pokemon';
import { getPage, getPokemon } from './cache';

export const queryPokemonsPages = async (
	number = 1,
	_fetch = fetch,
	next = 'https://pokeapi.co/api/v2/pokemon/'
): Promise<[IPokemon[], string]> => {
	let pokemons: IPokemon[] = [];
	for (let i = 0; i < number; i++) {
		const page = await getPage(next, _fetch);
		if (!page || !page.next) break;
		next = page.next;
		if (page.count < 1) break;
		for (let i = 0; i < page.results.length; i++) {
			const pokemon = await getPokemon(page.results[i].url, _fetch);
			if (!pokemon) break;
			pokemons = [...pokemons, pokemon];
		}
	}

	return [pokemons, next];
};
