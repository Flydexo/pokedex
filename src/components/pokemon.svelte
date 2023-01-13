<script lang="ts">
	import type { IPokemon } from 'src/types/pokemon';
	import '../css/pokemon.css';

	export let pokemon: IPokemon;

	function cardAnimate(node: HTMLDivElement) {
		node.addEventListener('mousemove', (e) => {
			const x = e.offsetX;
			const y = e.offsetY;
			const centerX = node.clientWidth / 2;
			const centerY = node.clientHeight / 2;
			const xDist = centerX - x;
			const yDist = y - centerY;
			const transformX = xDist * (6.25 / centerX);
			const transformY = yDist * (6.25 / centerY);
			node.style.transform = `perspective(700px) rotateX(${transformY}deg) rotateY(${transformX}deg) scale3d(1, 1, 1)`;
		});
	}
</script>

<div class="pokemon" use:cardAnimate>
	<img
		src={pokemon.sprites.other['official-artwork'].front_default}
		alt={pokemon.name}
		width="100"
	/>
	<h3>{pokemon.name.toLocaleUpperCase()}</h3>
	<div class="types">
		{#each pokemon.types as pokemonType}
			<img
				src={`/types/${pokemonType.type.name.toLowerCase()}.png`}
				alt={pokemonType.type.name}
				width="25"
				height="25"
			/>
		{/each}
	</div>
</div>
