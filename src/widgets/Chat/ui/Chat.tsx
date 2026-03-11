'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { Pane, SplitPane, usePersistence } from 'react-split-pane';
import { ChatEntity, ChatMessageEntity } from '@/entities/chat';
import { useUserStore } from '@/entities/user';
import { getSocket } from '@/shared/api/socket';
import { ChatListUpdatePayload } from '../model/chat.types';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';

export const Chat: FC = () => {
	const activeChatIdFromLocalStorage = typeof window === 'undefined' ? null : localStorage.getItem('activeChatId');
	const socket = getSocket('chat');
	const [sizes, setSizes] = usePersistence({
		key: 'chatLayout',
		debounce: 500,
	});

	const { user } = useUserStore();

	const prevChatIdRef = useRef<number | null>(null);

	const [messageText, setMessageText] = useState<string>('');
	const [messages, setMessages] = useState<ChatMessageEntity[]>([]);
	const [activeChatId, setActiveChatId] = useState<number | undefined>(() => {
		if (!activeChatIdFromLocalStorage) return undefined;
		const parsedChatId = Number(activeChatIdFromLocalStorage);
		return Number.isNaN(parsedChatId) ? undefined : parsedChatId;
	});
	const [chats, setChats] = useState<ChatEntity[]>([]);

	// Список чатов + глобальные события
	useEffect(() => {
		socket.emit('getChats', (data: ChatEntity[]) => {
			setChats(data || []);
		});

		const onChatCreate = (chat: ChatEntity) =>
			setChats((prev) => [
				chat,
				...prev,
			]);

		const onChatListUpdate = (payload: ChatListUpdatePayload) => {
			setChats((prev) => {
				const prevChats = prev.map((chat) =>
					chat.id === payload.chatId
						? {
								...chat,
								messages: [
									payload.lastMessage,
								],
							}
						: chat,
				);

				const sortedChats = prevChats.toSorted((a, b) => {
					const aTime = new Date(a.messages[0]?.createdAt).getTime() ?? 0;
					const bTime = new Date(b.messages[0]?.createdAt).getTime() ?? 0;
					return bTime - aTime;
				});

				return sortedChats;
			});
		};

		socket.on('chatCreated', onChatCreate);
		socket.on('chatListUpdate', onChatListUpdate);

		return () => {
			socket.off('chatCreated', onChatCreate);
			socket.off('chatListUpdate', onChatListUpdate);
		};
	}, [
		socket,
	]);

	// Вход/выход из комнаты и загрузка сообщений
	useEffect(() => {
		if (!activeChatId) return;

		const prevChatId = prevChatIdRef.current;
		if (prevChatId && prevChatId !== activeChatId) {
			socket.emit('leaveChat', {
				chatId: prevChatId,
			});
		}

		socket.emit(
			'joinChat',
			{
				chatId: activeChatId,
			},
			(joined: number) => {
				console.debug('joined', joined);
			},
		);

		socket.emit(
			'getMessages',
			{
				chatId: activeChatId,
				cursor: null,
				limit: 100,
			},
			(items: ChatMessageEntity[]) => {
				setMessages(items ?? []);
			},
		);

		const onNewMessage = (message: ChatMessageEntity) => {
			if (message.chatId !== activeChatId) return;
			setMessages((prev) => [
				...prev,
				message,
			]);
		};

		socket.on('newMessage', onNewMessage);
		prevChatIdRef.current = activeChatId;

		return () => {
			socket.off('newMessage', onNewMessage);
		};
	}, [
		socket,
		activeChatId,
	]);

	const sendMessage = () => {
		if (messageText.length > 0) {
			const value = messageText.trim();
			if (!value || !activeChatId) return;
			socket.emit('sendMessage', {
				chatId: activeChatId,
				text: value,
			});
			setMessageText('');
		}
	};

	const configureChatName = (chat: ChatEntity) => {
		let chatName: string = '';
		if (chat.members.length === 2) {
			chatName = chat.members.find((member) => member.id !== user?.id)?.username ?? 'Новый чат';
		}

		return chatName;
	};

	const activeChat = chats.find((chat) => chat.id === activeChatId);
	const activeChatName = activeChat ? configureChatName(activeChat) : '';

	const onChangeActiveChat = (chatId: number) => {
		setActiveChatId(chatId);
		localStorage.setItem('activeChatId', String(chatId));
	};

	return (
		<section className="flex h-[calc(100vh-50px-25px-1rem)] min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-muted/30 text-foreground">
			<SplitPane
				direction="horizontal"
				className="min-h-0 h-full"
				onResize={setSizes}
				dividerClassName="splitPane"
			>
				<Pane
					size={sizes[0]}
					className="min-h-0 h-full"
					defaultSize={400}
					minSize={200}
				>
					<ChatList
						chats={chats}
						activeChatId={activeChatId}
						onChangeActiveChat={onChangeActiveChat}
						resolveChatName={configureChatName}
					/>
				</Pane>
				<Pane
					size={sizes[1]}
					className="min-h-0 h-full"
					minSize={600}
				>
					<ChatWindow
						activeChatName={activeChatName}
						messages={messages}
						currentUserId={user?.id}
						messageText={messageText}
						onMessageTextChange={setMessageText}
						onSendMessage={sendMessage}
					/>
				</Pane>
			</SplitPane>
		</section>
	);
};
