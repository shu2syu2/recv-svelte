<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { sensorData, type SensorValues } from '$lib/stores/sensorData';

	const type = writable<keyof SensorValues | null>(null);
	const value = writable<number | null>(null);

	let unsubscribe: (() => void) | null = null;

	onMount(() => {
		window.addEventListener('message', (e: MessageEvent) => {
			const data = e.data as { type: keyof SensorValues };
			if ('type' in data) {
				type.set(data.type);
				unsubscribe?.(); // 前の購読を解除
				unsubscribe = sensorData.subscribe((vals) => {
					value.set(vals[data.type]);
				});
			}
		});
	});
</script>

<div style="text-align: center; padding: 1rem;">
	<h3>{$type}</h3>
	<p style="font-size: 2rem;">{$value}</p>
</div>
