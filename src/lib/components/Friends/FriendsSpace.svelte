<script>
	import { getContext } from 'svelte';

	const { displayName, friends } = getContext('info');
</script>

<div>
	<span class="orange-header">{displayName}'s Friend Space</span>

	<span class="transparent-header">{displayName} has <em>{friends}</em> friends.</span>
</div>
