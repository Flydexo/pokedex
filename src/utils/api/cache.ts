import { ZApiPokemonsResponse, type ApiPokemonsResponse } from '../../types/api';
import { ZPokemon, type IPokemon } from '../../types/pokemon';

export const cache: Map<string, IPokemon> = new Map();
export const pageCache: Map<string, ApiPokemonsResponse> = new Map();
export const nameCache: Map<string, string> = new Map();

export const getPokemon = async (url: string, _fetch = fetch): Promise<IPokemon | undefined> => {
	if (cache.has(url)) {
		return cache.get(url);
	} else {
		const pokeData = await (await _fetch(url, { cache: 'force-cache' })).json();
		const pokemon = ZPokemon.parse(pokeData);
		cache.set(url, pokemon);
		return pokemon;
	}
};

export const getPage = async (
	url: string,
	_fetch = fetch
): Promise<ApiPokemonsResponse | undefined> => {
	if (pageCache.has(url)) {
		return pageCache.get(url);
	} else {
		const pageData = await (await _fetch(url, { cache: 'force-cache' })).json();
		const page = ZApiPokemonsResponse.parse(pageData);
		pageCache.set(url, page);
		return page;
	}
};

export const searchPokemon = async (name: string, _fetch = fetch): Promise<IPokemon[]> => {
	const found: IPokemon[] = [];
	for (const [key, value] of nameCache.entries()) {
		if (key.toLowerCase().includes(name.toLowerCase())) {
			const pokemon = await getPokemon(value, _fetch);
			if (pokemon) found.push(pokemon);
		}
	}
	return found;
};

export const getAllPokemonNames = async (_fetch = fetch) => {
	if (nameCache.size > 0) return;
	let next = 'https://pokeapi.co/api/v2/pokemon/';
	while (next != '') {
		const page = await getPage(next, _fetch);
		if (!page || !page.next) break;
		next = page.next;
		if (page.count < 1) break;
		for (let i = 0; i < page.results.length; i++) {
			nameCache.set(page.results[i].name, page.results[i].url);
		}
	}
};
