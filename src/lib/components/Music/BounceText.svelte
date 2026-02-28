<script>
	import { AnimationFrames, ElementSize, watch } from 'runed';

	/** @type {{text: string}} */
	let { text } = $props();

	/** @type {HTMLSpanElement | undefined}*/
	let el = $state();

	const DIRECTION = {
		FORWARD: 1,
		BACKWARD: 0
	};

	const DEFAULT_HOLD = 5;

	const size = new ElementSize(() => el);

	let hold = $state(DEFAULT_HOLD);

	let charSize = $state(1);
	let position = $state(0);
	let direction = $state(DIRECTION.FORWARD);
	let total = $derived(Math.floor(size.width / charSize));

	let display = $derived.by(() => {
		if (text.length < total) {
			return text;
		}

		let sub = text.slice(position, position + total);

		if (sub.at(-1) !== text.at(-1)) {
			return (sub += '...');
		}

		return sub;
	});

	watch(
		() => text,
		() => {
			position = 0;
			direction = DIRECTION.FORWARD;
			hold = DEFAULT_HOLD;
		}
	);

	$effect(() => {
		if (el) {
			const measure = el.querySelector('.width');

			if (!measure) {
				return;
			}

			const { width } = measure.getBoundingClientRect();

			charSize = width;
		}
	});

	const anim = new AnimationFrames(
		() => {
			if (display.length === text.length) {
				return;
			}

			if (hold > 0) {
				hold -= 1;
				return;
			}

			if (
				(direction === DIRECTION.BACKWARD && display.slice(0, 5) === text.slice(0, 5)) ||
				(direction === DIRECTION.FORWARD &&
					display.slice(display.length - 5, display.length) ===
						text.slice(text.length - 5, text.length))
			) {
				direction = direction === DIRECTION.FORWARD ? DIRECTION.BACKWARD : DIRECTION.FORWARD;
				hold = DEFAULT_HOLD;
			} else {
				position = position + (direction === DIRECTION.FORWARD ? 1 : -1);
			}
		},
		{ fpsLimit: 5 }
	);
</script>

<span bind:this={el}>
	<span class="width" aria-hidden="true">L</span>
	{display}
</span>

<style lang="scss">
	span {
		position: relative;

		display: block;

		font-size: inherit;
	}

	.width {
		position: absolute;
		opacity: 0;
		visibility: hidden;

		pointer-events: none;
	}
</style>
