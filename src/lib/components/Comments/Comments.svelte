<script>
	import { getContext } from 'svelte';

	const { displayName } = getContext('info');
</script>

<div class="comments">
	<span class="orange-header">
		{displayName}'s Friends Comments
	</span>
</div>

<style lang="scss">
	.comments {
		max-width: 650px;

		margin: 0 auto;
	}
</style>
