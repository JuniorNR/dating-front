'use client';

import { FC } from 'react';
import { Button } from '@/shared/ui/button';
import { ChatListProps } from '../model/chat.types';

export const ChatList: FC<ChatListProps> = ({
	chats,
	activeChatId,
	onChangeActiveChat,
	resolveChatName,
}) => {
	return (
		<aside className="min-h-0 h-full overflow-y-auto border-r border-border bg-muted/25">
			<header className="flex h-[50px] items-center border-b border-r border-border bg-secondary/70 px-4">
				<h2 className="text-sm font-semibold text-primary">Чаты</h2>
			</header>
			<div className="space-y-2 p-2">
				{chats.map((chat) => (
					<Button
						key={chat.id}
						type="button"
						variant="outline"
						onClick={() => onChangeActiveChat(chat.id)}
						className={`h-auto w-full items-start justify-start rounded-sm px-3 py-2 text-left ${activeChatId === chat.id ? 'border-primary/40 bg-primary/10 dark:border-primary/70 dark:bg-primary/25 dark:text-primary-foreground dark:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]' : 'bg-secondary/70 text-secondary-foreground'}`}
					>
						<div className="w-full">
							<div className="flex items-center justify-between">
								<p className="text-sm font-semibold text-primary">{resolveChatName(chat)}</p>
								<span className="rounded-full border border-primary/30 bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">2</span>
							</div>
							<p className="mt-0.5 truncate text-xs text-muted-foreground">{chat.messages[0]?.text || 'Начните диалог'}</p>
						</div>
					</Button>
				))}
			</div>
		</aside>
	);
};
