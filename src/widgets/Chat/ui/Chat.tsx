'use client';
import { FC, useEffect, useReducer, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pane, SplitPane, usePersistence } from 'react-split-pane';
import { ChatEntity, ChatMessageEntity } from '@/entities/chat';
import { useAuthUserStore } from '@/entities/authUser';
import { getSocket } from '@/shared/api/socket';
import { ChatListUpdatePayload } from '../model/chat.types';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';
import { chatReducer } from '../model/chat.utils';

export const Chat: FC = () => {
	const { t: tCommon } = useTranslation('common');
	const activeChatIdFromLocalStorage = typeof window === 'undefined' ? null : localStorage.getItem('activeChatId');
	const socket = getSocket('chat');
	const [sizes, setSizes] = usePersistence({
		key: 'chatLayout',
		debounce: 500,
	});

	const { authUser } = useAuthUserStore();

	const prevChatIdRef = useRef<number | null>(null);

	const [messageText, setMessageText] = useState<string>('');
	const [chatState, dispatch] = useReducer(chatReducer, {
		chats: [],
		messages: [],
		activeChatId: (() => {
			if (!activeChatIdFromLocalStorage) return undefined;
			const parsedChatId = Number(activeChatIdFromLocalStorage);
			return Number.isNaN(parsedChatId) ? undefined : parsedChatId;
		})(),
	});
	const { chats, messages, activeChatId } = chatState;

	// Список чатов + глобальные события
	useEffect(() => {
		socket.emit('chat:list', (data: ChatEntity[]) => {
			dispatch({
				type: 'setChatList',
				payload: data || [],
			});
		});

		const onChatCreate = (chat: ChatEntity) =>
			dispatch({
				type: 'addChat',
				payload: chat,
			});

		const onChatDelete = (chatId: number) => {
			dispatch({
				type: 'deleteChat',
				payload: chatId,
			});

			if (activeChatId === chatId) {
				localStorage.removeItem('activeChatId');
			}

			if (prevChatIdRef.current === chatId) {
				prevChatIdRef.current = null;
			}
		};

		const onChatListUpdate = (payload: ChatListUpdatePayload) => {
			dispatch({
				type: 'updateChatListItem',
				payload,
			});
		};

		socket.on('chat:created', onChatCreate);
		socket.on('chat:list:update', onChatListUpdate);
		socket.on('chat:deleted', onChatDelete);

		return () => {
			socket.off('chat:created', onChatCreate);
			socket.off('chat:list:update', onChatListUpdate);
			socket.off('chat:deleted', onChatDelete);
		};
	}, [socket, activeChatId]);

	// Вход/выход из комнаты + события чата
	useEffect(() => {
		if (!activeChatId) return;

		const prevChatId = prevChatIdRef.current;
		if (prevChatId && prevChatId !== activeChatId) {
			socket.emit('chat:leave', {
				chatId: prevChatId,
			});
		}

		socket.emit('chat:join', {
			chatId: activeChatId,
		});

		socket.emit(
			'chat:messages',
			{
				chatId: activeChatId,
				cursor: null,
				limit: 100,
			},
			(items: ChatMessageEntity[]) => {
				dispatch({
					type: 'setChatMessages',
					payload: items ?? [],
				});
			},
		);

		const onNewMessage = (message: ChatMessageEntity) => {
			if (message.chatId !== activeChatId) return;
			dispatch({
				type: 'appendMessage',
				payload: message,
			});
		};

		socket.on('chat:message:new', onNewMessage);
		prevChatIdRef.current = activeChatId;

		return () => {
			socket.off('chat:message:new', onNewMessage);
		};
	}, [socket, activeChatId]);

	const handleSendMessage = () => {
		if (messageText.length > 0) {
			const value = messageText.trim();
			if (!value || !activeChatId) return;
			socket.emit('chat:message:send', {
				chatId: activeChatId,
				text: value,
			});
			setMessageText('');
		}
	};

	const handleDeleteChat = (chatId: number) => {
		socket.emit('chat:delete', {
			chatId,
		});
		if (activeChatId === chatId) {
			socket.emit('chat:leave', {
				chatId,
			});
		}
	};

	const configureChatName = (chat: ChatEntity) => {
		let chatName: string = '';
		if (chat.members.length === 2) {
			chatName = chat.members.find((member) => member.id !== authUser?.id)?.username ?? tCommon('chat.defaultName');
		}

		return chatName;
	};

	const activeChat = chats.find((chat) => chat.id === activeChatId);
	const activeChatName = activeChat ? configureChatName(activeChat) : '';

	const onChangeActiveChat = (chatId: number) => {
		dispatch({
			type: 'setActiveChatId',
			payload: chatId,
		});
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
						onDeleteChat={handleDeleteChat}
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
						currentUserId={authUser?.id}
						messageText={messageText}
						onMessageTextChange={setMessageText}
						onSendMessage={handleSendMessage}
					/>
				</Pane>
			</SplitPane>
		</section>
	);
};
