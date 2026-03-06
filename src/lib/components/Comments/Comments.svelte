<script>
	import { getContext } from 'svelte';
	import User from './User.svelte';
	import { COMMENTS, USERS } from '$lib/js/users';
	import { randomBetween } from 'jthawme-utils';

	const { displayName } = getContext('info');

	const comments = $state(
		COMMENTS.map((comment, idx) => ({
			...USERS[idx],
			text: comment,
			timestamp: randomBetween(1172707200000, 1233446400000)
		}))
	);

	const sortedComments = $derived.by(() => {
		const arr = comments.slice();

		arr.sort((a, b) => {
			return b.timestamp - a.timestamp;
		});

		return arr;
	});

	const dateFormatter = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'short',
		timeStyle: 'short'
	});
</script>

<div class="comments">
	<span class="orange-header">
		{displayName}'s Friends Comments
	</span>

	<span class="transparent-header">
		Displaying <em>{comments.length}</em> of <em>7294</em> comments
	</span>

	{#each sortedComments as comment}
		<div class="comment">
			<div>
				<User image={comment.image} username={comment.username} />
			</div>

			<div>
				<span class="date">{dateFormatter.format(new Date(comment.timestamp))}</span>

				{@html comment.text.split('\n').join('<br/>')}
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.orange-header {
		width: 90%;
	}

	.comments {
		max-width: 650px;

		margin: 0 auto;
	}

	.comment {
		display: grid;

		grid-template-columns: 1fr 3fr;
		gap: 2px;

		margin: 2px auto;

		div {
			min-width: 0;

			padding: 1em 1.5em;
		}

		div:nth-child(1) {
			background-color: var(--color-myspace-orange-3);
		}
		div:nth-child(2) {
			background-color: var(--color-myspace-orange-4);
		}
	}

	.date {
		display: block;

		font-weight: bold;

		margin-bottom: 1em;
	}
</style>
