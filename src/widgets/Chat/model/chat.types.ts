import { ChatEntity, ChatMessageEntity } from '@/entities/chat';

export interface ChatListProps {
	chats: ChatEntity[];
	activeChatId?: number;
	onChangeActiveChat: (chatId: number) => void;
	resolveChatName: (chat: ChatEntity) => string;
}

export interface ChatWindowProps {
	activeChatName: string;
	messages: ChatMessageEntity[];
	currentUserId?: number;
	messageText: string;
	onMessageTextChange: (value: string) => void;
	onSendMessage: () => void;
}

export interface ChatListUpdatePayload {
	chatId: number;
	lastMessage: ChatMessageEntity;
}

