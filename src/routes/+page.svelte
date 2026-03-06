<script>
	import Box from '$lib/components/Box.svelte';
	import Comments from '$lib/components/Comments/Comments.svelte';
	import FriendsSpace from '$lib/components/Friends/FriendsSpace.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import Player from '$lib/components/Music/Player.svelte';
	import Seo from '$lib/components/SEO.svelte';
	import { getContext } from 'svelte';

	const { displayName, genre, description } = getContext('info');

	const info = $state([
		['Member Since', '3/1/07'],
		['Band Website', '[aoa.jthaw.club](https://aoa.jthaw.club)'],
		[
			'Band Members',
			"Andy O'Carroll - Guitar<br/>Danny Jones - Drums<br/>Harry Brown - Bass<br/>Jonny Thaw - Guitar/Synth<br/>Ollie Allport - Singer"
		]
	]);

	const about = $state(
		`We are just a bunch of cool guys doing cool pop punk synth from Shrewsbury, UK  

For fans of Motion City Soundtrack, Farewell, KFC, Ghostbusters`
	);

	const contact = $state([
		['/', 'Send Message'],
		['/', 'Forward to friend'],
		['/', 'Add to Friends'],
		['/', 'Add to Favorites'],
		['/', 'Instant Message'],
		['/', 'Block User'],
		['/', 'Add to Group'],
		['/', 'Rank User']
	]);
</script>

<Seo />

<section>
	<div class="left">
		<div class="group profile">
			<h1>{displayName}</h1>
			<span>{genre}</span>

			<div class="profile-info">
				<div class="profile-info-image">
					<a href="/media"><img src="/images/profile.jpg" alt="" /></a>

					<a href="/media">View more pics</a>
				</div>

				<div class="profile-info-text">
					<em>"{description}"</em>
					<br /><br />
					shrewsbury<br />
					United Kingdom<br />
					<br />
					Profile Views: 69420
					<br /><br /><br />
					Last Login: 4/7/2008
				</div>
			</div>
		</div>

		<div class="group">
			<Box title={`Contacting ${displayName}`}>
				<div class="table">
					{#each contact as item}
						<span><a href={item[0]}>{item[1]}</a></span>
					{/each}
				</div>
			</Box>
		</div>

		<div class="group url">
			<span><b>MySpace URL:</b></span><br />
			https://aoa.jthaw.club
		</div>

		<div class="group">
			<Box title={`${displayName} General Info`}>
				{#each info as row}
					<div class="table-row">
						<span class="table-row-header">
							{row[0]}
						</span>
						<span class="table-row-cell">
							<Markdown content={row[1]} inline />
						</span>
					</div>
				{/each}
			</Box>
		</div>
	</div>

	<div class="right">
		<div class="group">
			<Player />
		</div>

		<div class="group big">
			<span class="orange-header">About {displayName}</span>

			<Markdown content={about} />
		</div>

		<div class="group">
			<FriendsSpace />
		</div>
	</div>

	<div class="bottom">
		<Comments />
	</div>
</section>

<style lang="scss">
	:global(body.homepage) {
		background-image: url('/images/bg/3.jpg');
		background-size: 64px;
	}

	section {
		display: grid;

		gap: 1rem;

		@include tablet {
			grid-template-columns: 2fr 3fr;
		}
	}
	.left {
		padding: 1rem 2rem;
	}

	.right {
		padding: 1rem;
	}

	.bottom {
		grid-column: 1 / -1;

		padding: 1rem;
	}

	.group {
		margin-bottom: 3rem;

		&.big {
			margin: 1rem 0 2rem;
		}
	}

	.profile {
		h1 {
			font-size: 1.4em;

			margin: 0;
		}

		&-info {
			display: grid;

			grid-template-columns: 1fr 1fr;
			gap: 1rem;

			padding: 1rem 0;

			&-image {
				display: flex;

				flex-direction: column;

				align-items: center;
				gap: 0.5rem;
			}
		}
	}

	.url {
		font-size: 0.8em;

		border: 1px solid currentColor;

		padding: 0.25em 0.5em;
	}

	.table {
		display: grid;

		grid-template-columns: repeat(2, 1fr);

		gap: 0.5rem;

		padding: 0.5rem;
	}
</style>
