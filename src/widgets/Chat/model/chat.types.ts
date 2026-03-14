import { ChatEntity, ChatMessageEntity } from '@/entities/chat';

export interface ChatListProps {
	chats: ChatEntity[];
	activeChatId?: number;
	onChangeActiveChat: (chatId: number) => void;
	onDeleteChat: (chatId: number) => void;
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

export interface ChatState {
	chats: ChatEntity[];
	messages: ChatMessageEntity[];
	activeChatId: number | undefined;
}

export type ChatAction =
	| {
			type: 'setChatList';
			payload: ChatEntity[];
	  }
	| {
			type: 'addChat';
			payload: ChatEntity;
	  }
	| {
			type: 'deleteChat';
			payload: number;
	  }
	| {
			type: 'updateChatListItem';
			payload: ChatListUpdatePayload;
	  }
	| {
			type: 'setChatMessages';
			payload: ChatMessageEntity[];
	  }
	| {
			type: 'appendMessage';
			payload: ChatMessageEntity;
	  }
	| {
			type: 'setActiveChatId';
			payload: number | undefined;
	  };
