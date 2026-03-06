<script>
	/** @type {{image: string | import('vite-imagetools').Picture, username: string, link?: string}} */
	let { image, username, link } = $props();
</script>

{#snippet imageDisplay(/** @type {string | import('vite-imagetools').Picture} */ img)}
	{#if typeof img === 'string'}
		<img src={img} alt="" />
	{:else}
		<enhanced:img src={img} alt="" />
	{/if}
{/snippet}

<div>
	{#if link}
		<a href={link}>{username}</a>
		<a href={link}>
			{@render imageDisplay(image)}
		</a>
	{:else}
		<span>{username}</span>
		<span>
			{@render imageDisplay(image)}
		</span>
	{/if}
</div>

<style lang="scss">
	div {
		text-align: center;

		color: var(--color-myspace-blue-1);

		display: flex;

		flex-direction: column;
		font-weight: bold;

		gap: 0.5rem;

		span {
			word-break: break-all;
		}
	}
</style>
