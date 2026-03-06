<script>
	import { getContext } from 'svelte';

	import { BAND_USERS, USERS } from '$lib/js/users';
	import User from '../Comments/User.svelte';

	const { displayName, friends } = getContext('info');

	const friendList = $state(BAND_USERS.slice(0, 8));
</script>

<div>
	<span class="orange-header">{displayName}'s Friend Space</span>

	<span class="transparent-header">{displayName} has <em>{friends}</em> friends.</span>

	<div class="pool">
		{#each friendList as friend}
			<User {...friend} />
		{/each}
	</div>
</div>

<style lang="scss">
	.pool {
		display: grid;

		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

		gap: 1rem;

		margin: 2rem 0;
	}
</style>
