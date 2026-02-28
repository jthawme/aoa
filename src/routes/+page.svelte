<script>
	import Comments from '$lib/components/Comments/Comments.svelte';
	import FriendsSpace from '$lib/components/Friends/FriendsSpace.svelte';
	import Player from '$lib/components/Music/Player.svelte';
	import Seo from '$lib/components/SEO.svelte';
</script>

<Seo />

<main>
	<header>
		<div>
			<span>MySpace.com | Home</span>

			<span>Help | Signup</span>
		</div>

		<nav>
			<span>Home</span>
			<span>Browse</span>
			<span>Search</span>
			<span>Invite</span>
			<span>Film</span>
			<span>Mail</span>
			<span>Blog</span>
			<span>Favorites</span>
			<span>Forum</span>
			<span>Groups</span>
			<span>Events</span>
			<span>Videos</span>
			<span>Music</span>
			<span>Classifieds</span>
		</nav>
	</header>

	<section>
		<div class="left">left</div>

		<div class="right">
			<Player />

			<FriendsSpace />
		</div>

		<div class="bottom">
			<Comments />
		</div>
	</section>

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
	:global(body) {
		background-image: url('/images/bg/3.jpg');
		background-size: 64px;
	}

	main {
		background-color: white;

		margin: 0 1rem;

		max-width: calc(1080px - 4em);

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

		span {
			white-space: nowrap;

			&:not(:last-child):after {
				content: ' | ';
				color: var(--color-black);
			}
		}
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
