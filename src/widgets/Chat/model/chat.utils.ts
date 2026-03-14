import { ChatAction, ChatState } from "./chat.types";

export const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
	switch (action.type) {
		case 'setChatList':
			return {
				...state,
				chats: action.payload,
			};
		case 'addChat':
			return {
				...state,
				chats: [
					action.payload,
					...state.chats,
				],
			};
		case 'deleteChat':
			return {
				...state,
				chats: state.chats.filter((chat) => chat.id !== action.payload),
				messages: state.messages.filter((message) => message.chatId !== action.payload),
				activeChatId: state.activeChatId === action.payload ? undefined : state.activeChatId,
			};
		case 'updateChatListItem': {
			const nextChats = state.chats.map((chat) =>
				chat.id === action.payload.chatId
					? {
							...chat,
							messages: [action.payload.lastMessage],
						}
					: chat,
			);

			return {
				...state,
				chats: nextChats.toSorted((a, b) => {
					const aTime = new Date(a.messages[0]?.createdAt).getTime() ?? 0;
					const bTime = new Date(b.messages[0]?.createdAt).getTime() ?? 0;
					return bTime - aTime;
				}),
			};
		}
		case 'setChatMessages':
			return {
				...state,
				messages: action.payload,
			};
		case 'appendMessage':
			return {
				...state,
				messages: [
					...state.messages,
					action.payload,
				],
			};
		case 'setActiveChatId':
			return {
				...state,
				activeChatId: action.payload,
			};
		default:
			return state;
	}
};