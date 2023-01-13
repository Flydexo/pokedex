<script lang="ts">
	import Pokemon from '../components/pokemon.svelte';
	import '../css/index.css';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { queryPokemonsPages } from '../utils/api/pokemon';

	export let data: PageData;
	let pokemons = data.pokemons;
	let allPokemons = data.pokemons;

	onMount(async () => {
		let next = data.nextPage;
		window.onscroll = async function () {
			if (
				window.innerHeight + window.scrollY >= document.body.offsetHeight &&
				pokemons.length == allPokemons.length
			) {
				const [_pokemons, nextPage] = await queryPokemonsPages(1, fetch, next);
				next = nextPage;
				allPokemons = [...allPokemons, ..._pokemons];
				pokemons = allPokemons;
			}
		};
	});

	$: search = async (value: string) => {
		if (value.length < 2) {
			pokemons = allPokemons;
			console.log('alls');
		} else {
			const foundPokemons = await (await fetch(`/api/search?q=${value}`)).json();
			pokemons = foundPokemons;
			console.log('found', pokemons);
		}
	};
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<div class="filters">
	<input
		type="text"
		name="search"
		id="search"
		placeholder="Search a pokemon"
		on:input={(e) => search(e.currentTarget.value)}
	/>
</div>
<div class="pokemons">
	{#each pokemons as pokemon}
		<Pokemon {pokemon} />
	{/each}
</div>
