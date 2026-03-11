'use client';

import { FC } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/widgets';
import { ChatWindowProps } from '../model/chat.types';

export const ChatWindow: FC<ChatWindowProps> = ({
	activeChatName,
	messages,
	currentUserId,
	messageText,
	onMessageTextChange,
	onSendMessage,
}) => {
	const isChatSelected = Boolean(activeChatName);

	return (
		<section className="flex min-h-0 h-full flex-col bg-secondary/50">
			<header className="flex h-[50px] items-center justify-between border-b border-border bg-secondary/70 px-4">
				<div>
					<p className="text-sm font-semibold text-primary">{activeChatName || 'Выберите чат'}</p>
					<p className="text-xs text-muted-foreground">{isChatSelected ? 'online' : 'Нет активного чата'}</p>
				</div>
				<Button
					type="button"
					size="sm"
					variant="outline"
					className="rounded-sm"
					disabled={!isChatSelected}
				>
					Подробнее
				</Button>
			</header>

			<div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-y-auto p-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`${message.authorId === currentUserId ? 'ml-auto bg-primary/15' : 'bg-accent/60'} max-w-1/2 w-fit rounded-xl px-3 py-2 text-sm`}
					>
						{message.text}
					</div>
				))}
			</div>

			<footer className="p-3">
				<div className="flex items-center gap-2">
					<Input
						value={messageText}
						onChange={(event) => onMessageTextChange(event.target.value)}
						placeholder="Напишите сообщение..."
						className="rounded-sm"
						disabled={!isChatSelected}
					/>
					<Button
						type="button"
						variant="secondary"
						className="rounded-sm"
						onClick={onSendMessage}
						disabled={!isChatSelected}
					>
						Отправить
					</Button>
				</div>
			</footer>
		</section>
	);
};
