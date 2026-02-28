<script>
	import { tick } from 'svelte';

	/** @type {{value: number, onValue?: (value: number) => void, onUpdate?: (value: number) => void, min?: number, max?: number, step?: number}} */
	let { value, onValue, onUpdate, min = 0, max = 1, step = 0.001 } = $props();

	/** @type {HTMLInputElement | undefined} */
	let el = $state();

	let interacting = $state(false);

	function onInteract(e) {
		onUpdate && onUpdate(e.target.value);
		interacting = true;
	}

	async function onChange(e) {
		onValue && onValue(e.target.value);
		interacting = false;
	}

	$effect(() => {
		if (!interacting && el) {
			el.value = value;
		}
	});
</script>

<input
	bind:this={el}
	type="range"
	value={min}
	oninput={onInteract}
	onchange={onChange}
	{min}
	{max}
	{step}
/>

<style lang="scss">
	@mixin thumb {
		border: 0.1em solid var(--player-grey-1a);
		height: 1em;
		width: 2em;
		border-radius: 0.25em;
		background: var(--player-chrome-gradient);
		cursor: pointer;
		// box-shadow:
		// 	1px 1px 1px #000000,
		// 	0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
	}

	@mixin track {
		width: 100%;
		height: 0.4em;
		cursor: pointer;
	}

	@mixin track-fill {
		box-shadow: 0.05em -0.05em 0.1em white inset;
		background: var(--color-black);
		border-radius: 0;
		border-width: 0.2px;
		border-style: solid;
		border-color: var(--player-grey-2);
		border-bottom-color: white;
		border-left-color: white;
	}

	/* Special styling for WebKit/Blink */
	:global(input[type='range']::-webkit-slider-thumb) {
		-webkit-appearance: none;
		margin-top: -0.35em; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
		@include thumb;
	}

	/* All the same stuff for Firefox */
	:global(input[type='range']::-moz-range-thumb) {
		@include thumb;
	}

	/* All the same stuff for IE */
	:global(input[type='range']::-ms-thumb) {
		@include thumb;
	}

	:global(input[type='range']::-webkit-slider-runnable-track) {
		@include track;
		@include track-fill;
	}

	:global(input[type='range']::-moz-range-track) {
		@include track;
		@include track-fill;
	}

	:global(input[type='range']::-ms-track) {
		@include track;
		background: transparent;
		border-color: transparent;
		border-width: 16px 0;
		color: transparent;
	}
	:global(input[type='range']::-ms-fill-lower) {
		@include track-fill;
	}
	:global(input[type='range']::-ms-fill-upper) {
		@include track-fill;
	}
</style>
