<script>
	let { title, children } = $props();
</script>

<div class="box">
	<div class="box-title blue-header">{title}</div>

	{@render children()}
</div>

<style lang="scss">
	.box {
		border: 1px solid var(--color-table-header);
	}
</style>
