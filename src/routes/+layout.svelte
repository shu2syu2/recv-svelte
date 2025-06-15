<script lang="ts">
	import { onMount } from 'svelte';
	import { sensorData, connectionStatus, type SensorValues } from '$lib/stores/sensorData';

	let lastUpdate = Date.now();

	function fetchSensorData(): SensorValues {
		return {
			temperature: Math.random() * 30 + 10,
			humidity: Math.random() * 100,
			vibration: Math.random() * 5
		};
	}

	onMount(() => {
		const update = () => {
			const now = Date.now();
			const delay = now - lastUpdate;

			lastUpdate = now;
			const data = fetchSensorData();
			sensorData.set(data);

			if (delay > 8000) {
				connectionStatus.set('低下');
			} else {
				connectionStatus.set('正常');
			}
		};

		update();

		const timer = setInterval(update, 5000);

		// 切断チェック用（15秒以上未更新で "切断"）
		const checkTimer = setInterval(() => {
			if (Date.now() - lastUpdate > 15000) {
				connectionStatus.set('切断');
			}
		}, 3000);

		return () => {
			clearInterval(timer);
			clearInterval(checkTimer);
		};
	});
</script>

<slot />
