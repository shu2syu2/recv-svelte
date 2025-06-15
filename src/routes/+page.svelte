<script lang="ts">
	import { sensorData, connectionStatus, type SensorValues } from '$lib/stores/sensorData';

	let selected1: keyof SensorValues = 'temperature';
	let selected2: keyof SensorValues = 'humidity';

	let iframeLeft: HTMLIFrameElement | null = null;
	let iframeRight: HTMLIFrameElement | null = null;

	let latestData: SensorValues = { temperature: 0, humidity: 0, vibration: 0 };
	let status: '正常' | '低下' | '切断' = '正常';

	sensorData.subscribe((data) => {
		latestData = data;
	});

	connectionStatus.subscribe((s) => {
		status = s;
	});

	function sendToIframes() {
		iframeLeft?.contentWindow?.postMessage({ type: selected1 }, '*');
		iframeRight?.contentWindow?.postMessage({ type: selected2 }, '*');
	}
</script>

<h2>表示項目選択</h2>
<div class="status {status}">通信品質：{status}</div>

<label>
	左側：
	<select bind:value={selected1}>
		<option value="temperature">温度</option>
		<option value="humidity">湿度</option>
		<option value="vibration">振動</option>
	</select>
</label>

<label>
	右側：
	<select bind:value={selected2}>
		<option value="temperature">温度</option>
		<option value="humidity">湿度</option>
		<option value="vibration">振動</option>
	</select>
</label>

<button on:click={sendToIframes}>OK</button>

<div class="container">
	<iframe bind:this={iframeLeft} src="/value" />
	<iframe bind:this={iframeRight} src="/value" />
</div>

<style>
	.container {
		display: flex;
		gap: 1rem;
		margin-top: 1rem;
	}

	iframe {
		width: 50%;
		height: 300px;
		border: 1px solid #ccc;
	}

	.status {
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.status.正常 {
		color: green;
	}
	.status.低下 {
		color: orange;
	}
	.status.切断 {
		color: red;
	}
</style>
