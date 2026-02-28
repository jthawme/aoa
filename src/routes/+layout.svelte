<script>
	import 'normalize.css';
	import '$lib/styles/global.scss';

	import { setContext } from 'svelte';

	/** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
	let { data, children } = $props();

	setContext('site', {
		title: 'TEMPLATE',
		description: 'TEMPLATE DESCRIPTION',
		url: 'https://jthaw.club',
		seperator: '–'
	});

	setContext('info', {
		displayName: 'All Obstacles Aside',
		friends: 58008
	});
</script>

{@render children()}
