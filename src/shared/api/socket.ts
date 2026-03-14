'use client';

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;
let activeNamespace: string | null = null;

const createSocket = (namespace: string) => {
	const baseWsUrl = process.env.NEXT_PUBLIC_WS_URL;
	if (!baseWsUrl) {
		throw new Error('NEXT_PUBLIC_WS_URL is not defined');
	}

	return io(`${baseWsUrl}/${namespace}`, {
		transports: ['websocket'],
		withCredentials: true,
		reconnection: true,
	});
};

export const getSocket = (namespace: string) => {
	if (!socket || activeNamespace !== namespace) {
		if (socket) {
			socket.disconnect();
		}

		socket = createSocket(namespace);
		activeNamespace = namespace;
	}
	return socket;
};

export const connectSocket = (namespace: string) => {
	const currentSocket = getSocket(namespace);
	if (!currentSocket.connected) {
		currentSocket.connect();
	}
	return currentSocket;
};

export const disconnectSocket = () => {
	if (!socket) return;

	socket.disconnect();
	socket = null;
	activeNamespace = null;
};

export const reconnectSocket = (namespace: string) => {
	disconnectSocket();
	return connectSocket(namespace);
};
