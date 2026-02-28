<script>
	import { queueSong, TRACKS } from './Music.svelte';

	/** @type {import('./Music.svelte').AlbumItem[]} */
	let items = $state(TRACKS);

	/** @type {string | null} */
	let currentView = $state(null);

	let currentItems = $derived(
		currentView !== null ? items.find((album) => album.id === currentView) : items
	);

	/**
	 *
	 * @param {import('./Music.svelte').TrackItem} song
	 * @param {string} album
	 */
	function onPlaySong(song, album) {
		queueSong(song, album);
	}

	/**
	 *
	 * @param {import('./Music.svelte').AlbumItem} album
	 */
	function onAlbumPick(album) {
		currentView = album.id;
	}

	function onAlbumReset() {
		currentView = null;
	}
</script>

{#if !currentItems}
	Something went wrong
{:else if 'items' in currentItems}
	<button class="breadcrumb btn-reset" onclick={() => onAlbumReset()}>← Go Back</button>
	{#each currentItems.items as song}
		<div class="song">
			<div class="song-top">
				<button type="button" class="btn-reset title" onclick={() => onPlaySong(song, currentView)}
					>{song.title}</button
				>
				<span>Plays: 0</span>
			</div>
			<div class="song-bottom">
				<a href={song.src} download={song.title}>Download</a>
				<button type="button" disabled class="btn-reset">Rate</button>
				<button type="button" disabled class="btn-reset">Lyrics</button>
				<button type="button" disabled class="btn-reset">Add</button>
			</div>
		</div>
	{/each}
{:else}
	{#each currentItems as album}
		<div class="album">
			<div class="album-top">
				<button type="button" class="btn-reset title" onclick={() => onAlbumPick(album)}
					>{album.title}</button
				>
				<span>Tracks: {album.items.length}</span>
			</div>
			<div class="album-bottom">
				<button type="button" class="btn-reset" onclick={() => onAlbumPick(album)}
					>View Album</button
				>
			</div>
		</div>
	{/each}
{/if}

<style lang="scss">
	.song,
	.album {
		color: var(--player-grey-1);

		display: flex;

		flex-direction: column;
		gap: 0.2em;

		padding: 0.6em 0;

		@include hover {
			background-color: var(--player-red-1);
		}

		&-top {
			display: flex;

			gap: 0.5em;

			span {
				flex-shrink: 0;
			}
		}

		&-bottom {
			display: flex;

			gap: 0.5em;

			button:not([disabled]),
			a {
				color: var(--color-black);
			}

			button,
			a,
			span {
				&:not(:last-child):after {
					content: ' | ';
				}
			}
		}

		&:not(:last-child) {
			border-bottom: 1px dotted currentColor;
		}
	}

	button {
		text-align: left;

		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		min-width: 0;
	}

	button:not([disabled]) {
		cursor: pointer;
	}

	.title,
	.breadcrumb {
		color: #02339a;
		text-decoration: underline;

		@include hover {
			opacity: 0.75;
		}
	}

	.breadcrumb {
		margin-bottom: 1em;
	}
</style>
