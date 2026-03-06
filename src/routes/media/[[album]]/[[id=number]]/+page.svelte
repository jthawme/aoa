<script>
	import { page } from '$app/state';
	import User from '$lib/components/Comments/User.svelte';

	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

{#if data.title}
	<h1>{data.title}</h1>
{/if}

{#if data.item}
	<div class="item">
		{#if typeof data.item.src === 'string'}
			{#if data.item.src.endsWith('.mp4')}
				<video src={data.item.src} preload="metadata" controls playsinline></video>
			{/if}
		{:else}
			<enhanced:img src={data.item.src} alt="" />
		{/if}

		<span class="item-title">{data.item.title}</span>
	</div>
{:else}
	<div class="grid">
		{#each data.media as item}
			<User link={item.link} image={item.cover} username={item.title} />
		{/each}
	</div>
{/if}

<div class="pagination">
	{#if data.prev}
		<a href={data.prev}>← Previous</a>
	{/if}
	{#if page.params.album}
		<a href="/media">View more pics</a>
	{/if}
	<a href="/">View profile</a>
	{#if data.next}
		<a href={data.next}>Next →</a>
	{/if}
</div>

<style lang="scss">
	h1 {
		padding: 1rem;
	}

	.grid {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

		padding: 1rem;

		gap: 0.5rem;
	}

	.pagination {
		display: flex;

		justify-content: center;

		padding: 1rem;

		margin-bottom: 2rem;

		a:not(:last-child) {
			margin-right: 0.35rem;

			&:after {
				content: ' | ';
			}
		}
	}

	.item {
		padding: 1rem;

		display: flex;

		flex-direction: column;

		align-items: center;

		gap: 0.5rem;

		&-title {
			font-weight: bold;
		}
	}
</style>
