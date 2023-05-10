<script lang="ts">
	import { active_tab } from '../lib/store';
	export let path: string;
	export let title: string;
	$: active = $active_tab === title;
</script>

<a
	class={` w-full  font-bold text-xl border rounded-2xl flex items-center p-4 hover:border-blue-400 ${`${active}?"border-blue-400":""`}`}
	href={path}>{title}</a
>
