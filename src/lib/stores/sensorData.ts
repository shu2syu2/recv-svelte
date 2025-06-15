import { writable } from 'svelte/store';

export interface SensorValues {
	temperature: number;
	humidity: number;
	vibration: number;
}

export const sensorData = writable<SensorValues>({
	temperature: 0,
	humidity: 0,
	vibration: 0
});

// 通信品質：'正常' | '低下' | '切断'
export const connectionStatus = writable<'正常' | '低下' | '切断'>('正常');
