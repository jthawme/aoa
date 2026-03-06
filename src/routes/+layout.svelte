<script>
	import 'normalize.css';
	import '$lib/styles/global.scss';

	import { setContext } from 'svelte';
	import { page } from '$app/state';

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props();

	setContext('site', {
		title: 'All Obstacles Aside - MySpace.com',
		description: "We are more rockin than your granny's chair",
		url: 'https://jthaw.club',
		seperator: '–'
	});

	setContext('info', {
		displayName: 'All Obstacles Aside',
		genre: `Pop punk`,
		description: `We are more rockin than your granny's chair`,
		friends: 58008
	});

	$effect(() => {
		document.body.classList.toggle('homepage', page.url.pathname === '/');
	});
</script>

<main>
	<header>
		<div>
			<span>MySpace.com | Home</span>

			<span>Help | Signup</span>
		</div>

		<nav>
			<a href="/">Home</a>
			<a href="/media">Browse</a>
			<a href="/">Search</a>
			<a href="/">Invite</a>
			<a href="/">Film</a>
			<a href="/">Mail</a>
			<a href="/">Blog</a>
			<a href="/">Favorites</a>
			<a href="/">Forum</a>
			<a href="/">Groups</a>
			<a href="/">Events</a>
			<a href="/">Videos</a>
			<a href="/">Music</a>
			<a href="/">Classifieds</a>
		</nav>
	</header>

	<div class="content">
		{@render children()}
	</div>

	<footer>
		<ul>
			<li>About</li>
			<li>FAQ</li>
			<li>Terms</li>
			<li>Privacy</li>
			<li>Safety Tips</li>
			<li>Contact Myspace</li>
			<li>Report Inappropriate Content</li>
			<li>Promote!</li>
			<li>Advertise</li>
		</ul>

		<span>©2003-20011 MySpace.com. All Rights Reserved.</span>
	</footer>
</main>

<style lang="scss">
	main {
		background-color: white;

		margin: 0 1rem;

		max-width: calc(950px - 4em);
		min-height: 100dvh;

		display: flex;

		flex-direction: column;

		@include desktop {
			margin: 0 auto;
		}
	}

	header {
		background-color: var(--color-myspace-blue-1);
		color: white;

		> div {
			display: flex;

			justify-content: space-between;

			padding: 2rem 1rem;
		}
	}

	nav {
		background-color: var(--color-myspace-blue-2);

		display: flex;

		flex-wrap: wrap;

		justify-content: center;
		color: white;

		gap: 0.8ch;

		padding: 0.2em 0;

		overflow: hidden;

		a {
			white-space: nowrap;

			color: white;

			@include hover {
				color: var(--color-myspace-blue-1);
			}

			&:not(:last-child):after {
				content: ' | ';
				color: var(--color-black);
			}
		}
	}

	.content {
		flex-grow: 1;
	}

	footer {
		text-align: center;

		background-color: var(--color-grey-1);

		padding: 1rem;

		ul {
			list-style: none;

			padding: 0;
			margin: 0 0 1rem;

			display: flex;

			flex-wrap: wrap;
			justify-content: center;

			gap: 0.5em;
			color: var(--color-myspace-blue-1);

			li:not(:last-child):after {
				content: ' | ';
				color: var(--color-black);
			}
		}
	}
</style>
