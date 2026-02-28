<script>
	import { AnimationFrames, ElementSize, watch } from 'runed';
	import { audioCtx, musicPlayer } from './Music.svelte';
	import { chunk } from '$lib/js/utils';

	const BARS = [
		'#009D00',
		'#9FFF65',
		'#FFFFA2',
		'#FFFF01',
		'#FFD504',
		'#FF9E00',
		'#FF6405',
		'#FE3700',
		'#F60006'
	];

	/** @type {AnalyserNode | undefined} */
	let analyser = $state();

	let frequencyData = {
		current: new Uint8Array()
	};

	let created = $state(false);

	/** @type {HTMLCanvasElement | undefined} */
	let canvasEl = $state();

	/** @type {CanvasRenderingContext2D | null} */
	let ctx = $derived(canvasEl ? canvasEl.getContext('2d') : null);

	/** @type {HTMLDivElement | undefined} */
	let wrapperEl = $state();

	let size = new ElementSize(() => wrapperEl);

	/**
	 *
	 * @param {HTMLAudioElement} player
	 */
	function setupAudioContext(player) {
		audioCtx.current = new AudioContext();
		analyser = audioCtx.current.createAnalyser();
		analyser.fftSize = 64;

		const source = audioCtx.current.createMediaElementSource(player);
		source.connect(analyser);
		analyser.connect(audioCtx.current.destination);

		frequencyData.current = new Uint8Array(analyser.frequencyBinCount);
	}

	function getData(columns = 6) {
		if (analyser) {
			analyser.getByteFrequencyData(frequencyData.current);

			return chunk(Array.from(frequencyData.current), columns).map((part) => {
				return part.reduce((total, curr) => total + curr, 0) / part.length / 256;
			});
		}
	}

	function update() {
		if (!audioCtx.current || !ctx) {
			return;
		}

		const columns = 6;
		const parts = getData(columns);

		if (!parts) {
			return;
		}

		ctx.clearRect(0, 0, size.width, size.height);

		const slice = size.width / columns;
		const sliceY = size.height / BARS.length;

		const PAD_X = 0.1;
		const PAD_Y = 0.2;
		const RADII = 0.1;

		parts.slice(0, columns).forEach((avg, idx) => {
			ctx.save();
			ctx.translate(slice * idx, size.height);

			// ctx.fillStyle = 'red';
			// ctx.fillRect(0, 0, slice, size.height * avg);

			const rows = Math.max(Math.round(avg * BARS.length), 1);

			for (let y = 0; y < rows; y++) {
				ctx.translate(0, -sliceY);

				ctx.save();

				ctx.translate(PAD_X * slice, PAD_Y * sliceY);

				ctx.fillStyle = BARS[y];
				ctx.beginPath();
				ctx.roundRect(0, 0, slice * (1 - PAD_X * 2), sliceY * (1 - PAD_Y * 2), slice * RADII);
				ctx.fill();
				ctx.restore();
			}
			ctx.restore();
		});
	}

	const animation = new AnimationFrames(update, { fpsLimit: () => 10 });

	$effect(() => {
		if (!canvasEl || !ctx) {
			return;
		}

		const dpr = window.devicePixelRatio;
		canvasEl.width = size.width * dpr;
		canvasEl.height = size.height * dpr;
		canvasEl.style.width = `${size.width}px`;
		canvasEl.style.height = `${size.height}px`;
		ctx.scale(dpr, dpr);
	});

	$effect(() => {
		if (musicPlayer.current && !audioCtx.current) {
			setupAudioContext(musicPlayer.current);
		}
	});
</script>

<div class="wrapper" bind:this={wrapperEl}>
	<canvas bind:this={canvasEl} width="200" height="100"></canvas>
</div>

<style lang="scss">
	.wrapper {
		position: relative;

		height: 100%;
	}

	canvas {
		position: absolute;

		inset: 0;
	}
</style>
