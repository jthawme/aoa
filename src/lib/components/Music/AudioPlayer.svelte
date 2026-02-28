<script>
	import { PlaySkipBack, PlaySkipForward, Play, Stop, Pause, VolumeHigh } from 'svelte-ionicons';

	import EQ from './EQ.svelte';
	import {
		changeVolume,
		getCurrentAlbum,
		getCurrentTrack,
		PLAYER,
		playerContext
	} from './Music.svelte';
	import SoftRange from './SoftRange.svelte';
	import Volume from './VolumeDisplay.svelte';
	import VolumeDisplay from './VolumeDisplay.svelte';
	import BounceText from './BounceText.svelte';

	let currentTrack = $derived(getCurrentTrack());
	let currentAlbum = $derived(getCurrentAlbum());

	let displayTime = $derived.by(() => {
		if (!currentTrack) {
			return '00:00';
		}

		return [Math.floor(playerContext.currentTime / 60), Math.round(playerContext.currentTime) % 60]
			.map((num) => num.toString().padStart(2, '0'))
			.join(':');
	});

	let seekPercentage = $derived(playerContext.currentTime / (playerContext.duration || 1));

	let playerStatus = $derived.by(() => {
		if (!playerContext.loaded) {
			return 'loading...';
		}

		return playerContext.playing ? 'playing' : 'paused';
	});

	function onSeek(value) {
		PLAYER.SEEK(value * playerContext.duration);
	}
</script>

<svg viewBox="0 0 20 20">
	<filter id="inset-shadow">
		<!-- Shadow offset -->
		<feOffset dx="0" dy="1" />
		<!-- Shadow blur -->
		<feGaussianBlur stdDeviation="1" result="offset-blur" />
		<!-- Invert drop shadow to make an inset shadow-->
		<feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
		<!-- Cut colour inside shadow -->
		<feFlood flood-color="black" flood-opacity=".75" result="color" />
		<feComposite operator="in" in="color" in2="inverse" result="shadow" />
		<!-- Placing shadow over element -->
		<feComposite operator="over" in="shadow" in2="SourceGraphic" />
	</filter>
</svg>

<div class="outer">
	<div class="actions">
		<div class="controls">
			<button onclick={() => PLAYER.STOP()} class="btn-reset">
				<Stop class="player-icon" />
			</button>
			<button onclick={() => PLAYER.PREVIOUS()} class="btn-reset">
				<PlaySkipBack class="player-icon" />
			</button>
			<button
				class:active={!playerContext.playing}
				onclick={() => PLAYER.PAUSE()}
				class="btn-reset"
			>
				<Pause class="player-icon" />
			</button>
			<button class:active={playerContext.playing} onclick={() => PLAYER.PLAY()} class="btn-reset">
				<Play class="player-icon" />
			</button>
			<button onclick={() => PLAYER.NEXT()} class="btn-reset">
				<PlaySkipForward class="player-icon" />
			</button>
		</div>

		<div class="volume">
			<div class="volume-icon"><VolumeHigh class="volume-icon-icon" /></div>
			<div class="volume-track">
				<SoftRange value={playerContext.volume} onUpdate={(volume) => changeVolume(volume)} />
			</div>
			<div class="volume-display">
				<VolumeDisplay value={playerContext.volume} />
			</div>
		</div>
	</div>

	<div class="display">
		<div class="display-window">
			<div class="display-window-text">
				{#if currentTrack && currentAlbum}
					<span><BounceText text={currentTrack.title.trim()} /></span>
					<span>{currentTrack.artist}</span>
					<span class:green={true}>{playerStatus}</span>
				{/if}
			</div>

			<div class="display-eq">
				<EQ />
			</div>
		</div>

		<div class="time">
			<span class="time-numbers">{displayTime}</span>

			<div class="time-seek">
				<SoftRange value={seekPercentage} onValue={onSeek} />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	svg {
		position: absolute;
		pointer-events: none;
		width: 0;
		height: 0;
	}

	.outer {
		display: grid;

		grid-template-columns: auto 1fr;

		gap: 1em;
	}

	.actions,
	.display {
		min-width: 0;
	}

	.actions {
		display: flex;
		flex-direction: column;

		gap: 0.2em;
	}

	.controls {
		display: flex;

		gap: 0.5em;

		:global(.player-icon) {
			width: 2em;
			height: 2em;

			color: currentColor;

			filter: url(#inset-shadow) drop-shadow(0 1px 1px white);
		}

		button {
			cursor: pointer;

			width: 3em;
			height: 3em;

			border: 1px solid var(--player-grey-1a);

			background: var(--player-chrome-gradient);

			border-radius: 0.25em;

			line-height: 0;

			color: var(--player-grey-1a);

			&.active {
				color: var(--player-green-1);
			}

			@include hover {
				background: var(--player-chrome-gradient-active);

				&:not(.active) {
					color: var(--player-grey-2);
				}
			}
		}
	}

	.display-window {
		display: grid;

		grid-template-columns: 3fr 1fr;

		gap: 0.5em;

		background-color: var(--player-grey-3);

		color: white;

		padding: var(--player-padding-y) var(--player-padding-x);

		border-radius: 0.5em;

		&-text {
			display: flex;

			flex-direction: column;

			height: 7ch;

			font-size: 0.8em;

			min-width: 0;

			span:nth-child(1) {
				font-weight: bold;
				font-size: 1.1em;
			}

			span {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				min-width: 0;
			}
		}
	}

	.display-eq {
		min-width: 0;
	}

	.time {
		display: grid;

		grid-template-columns: auto 1fr;
		gap: 0.5em;

		align-items: center;

		&-numbers {
			// font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
			color: var(--player-grey-1a);
			font-weight: bold;

			font-size: 0.8em;
		}
	}

	.green {
		color: var(--player-green-1);
	}

	:global(input[type='range']) {
		-webkit-appearance: none;
		appearance: none;

		width: 100%;
		background: transparent;

		&::-webkit-slider-thumb {
			-webkit-appearance: none;
		}

		&:focus {
			outline: none;
		}

		&::-ms-track {
			width: 100%;
			cursor: pointer;

			background: transparent;
			border-color: transparent;
			color: transparent;
		}
	}

	.volume {
		display: grid;

		grid-template-columns: auto 1fr;
		column-gap: 0.5em;
		row-gap: 0.25em;

		&-icon {
			color: var(--player-grey-1a);

			grid-row: 1 / span 2;

			:global(.volume-icon-icon) {
				height: 1.5em;
				width: 1.5em;
			}
		}

		&-track {
		}

		&-display {
		}
	}
</style>
