<script>
	import { ElementSize } from 'runed';

	import AudioPlayer from './AudioPlayer.svelte';
	import { getCurrentAlbum, instantiatePlayer, stats, TRACKS } from './Music.svelte';
	import Tracks from './Tracks.svelte';
	import { onMount } from 'svelte';

	/** @type {HTMLDivElement | undefined} */
	let playerEl = $state();

	const playerSize = new ElementSize(() => playerEl);

	let scale = $derived(playerSize.width / 450);

	let currentAlbum = $derived(getCurrentAlbum() ?? TRACKS[0]);

	onMount(() => {
		return instantiatePlayer();
	});
</script>

<div class="outer" bind:this={playerEl} style:--scale={scale}>
	<div class="player">
		<AudioPlayer />
	</div>

	<div class="info">
		<span>Total Plays: {stats.total + stats.plays}</span>
		<span>Downloads Today: {stats.downloads}</span>
		<span>Plays Today: {stats.plays}</span>
	</div>

	<div class="display">
		<img src={currentAlbum.artwork} alt="" />

		<span class="display-text">
			<span>{currentAlbum.title}</span>
			<span>{currentAlbum.credits}</span>
		</span>
	</div>

	<div class="tracks">
		<Tracks />
	</div>
</div>

<style lang="scss">
	:root {
		--player-grey-1: #d7d7d7;
		--player-grey-1a: #696667;
		--player-grey-2: #303030;
		--player-grey-3: #272020;

		--player-padding-x: 0.8em;
		--player-padding-y: 0.4em;

		--player-red-1: #ffd5d6;
		--player-green-1: #009200;

		--player-chrome-gradient: linear-gradient(
			to bottom,
			#f6f6f6 9%,
			#a1a1a1 50%,
			#989898 79%,
			#eeeeee 95%
		);
		--player-chrome-gradient-active: linear-gradient(
			to bottom,
			#c9c9c9 9%,
			#7d7d7d 50%,
			#636363 69%,
			#c2c2c2 94%
		);
	}

	.outer {
		display: grid;

		grid-template-areas:
			'player player'
			'info info'
			'display tracks';

		grid-template-rows: auto auto 1fr;
		grid-template-columns: 2fr 3fr;

		border: 1px solid black;

		// temporary
		aspect-ratio: 522 / 400;

		font-size: calc(11px * var(--scale));
	}

	.player {
		grid-area: player;

		background: var(--player-chrome-gradient);
		padding: var(--player-padding-y) var(--player-padding-x);
	}

	.info {
		grid-area: info;

		background-color: var(--player-grey-2);
		color: white;

		display: flex;

		justify-content: space-between;

		font-size: 0.8em;

		padding: var(--player-padding-y) var(--player-padding-x);

		font-weight: bold;
	}

	.display {
		grid-area: display;
		min-height: 0;

		background-color: var(--player-grey-1);

		padding: var(--player-padding-y) var(--player-padding-x);

		display: flex;

		flex-direction: column;

		justify-content: center;

		img {
			min-height: 0;
			object-fit: contain;
		}

		&-text {
			display: flex;

			flex-direction: column;
			padding: var(--player-padding-y) var(--player-padding-x);

			color: var(--player-grey-2);

			font-size: 0.8em;
		}
	}

	.tracks {
		grid-area: tracks;

		padding: var(--player-padding-y) var(--player-padding-x);

		min-width: 0;
		min-height: 0;

		overflow: auto;
	}
</style>
