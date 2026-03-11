import { UserEntity } from '@/shared/api/ApiGenerated';

export interface ChatEntity {
	id: number;
	createdAt: Date;
	UpdatedAt: Date | null;
	members: Omit<UserEntity[], 'announcement' | 'roles'>;
	messages: ChatMessageEntity[];
}

export interface ChatMessageEntity {
	id: number;
	text: string;
	authorId: number;
	chatId: number;
	author: UserEntity;
	createdAt: Date;
	updatedAt: Date | null;
}
