'use client';

import { FC } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { SimpleModal } from '@/widgets/SimpleModal';
import { ChatListProps } from '../model/chat.types';

export const ChatList: FC<ChatListProps> = ({
	chats,
	activeChatId,
	onChangeActiveChat,
	onDeleteChat,
	resolveChatName,
}) => {
	return (
		<aside className="min-h-0 h-full overflow-y-auto border-r border-border bg-muted/25">
			<header className="flex h-[50px] items-center border-b border-r border-border bg-secondary/70 px-4">
				<h2 className="text-sm font-semibold text-primary">Чаты</h2>
			</header>
			<div className="space-y-2 p-2">
				{chats.map((chat) => (
					<div
						key={chat.id}
						className="relative"
					>
						<Button
							type="button"
							variant="outline"
							onClick={() => onChangeActiveChat(chat.id)}
							className={`h-auto w-full items-start justify-start rounded-sm px-3 py-2 pr-10 text-left ${activeChatId === chat.id ? 'border-primary/40 bg-primary/10 dark:border-primary/70 dark:bg-primary/25 dark:text-primary-foreground dark:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]' : 'bg-secondary/70 text-secondary-foreground'}`}
						>
							<div className="w-full">
								<p className="truncate text-sm font-semibold text-primary">{resolveChatName(chat)}</p>
								<p className="mt-0.5 truncate text-xs text-muted-foreground">{chat.messages[0]?.text || 'Начните диалог'}</p>
							</div>
						</Button>
						<div className="absolute right-2 top-2">
							<SimpleModal
								title="Удалить чат"
								description="Вы уверены, что хотите удалить этот чат?"
								isLoading={false}
								onSuccess={() => onDeleteChat(chat.id)}
								confirmText="Удалить"
								closeText="Отмена"
								renderTrigger={
									<Button
										type="button"
										variant="ghost"
										className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive"
										aria-label="Удалить чат"
									>
										<Trash2 className="size-4" />
									</Button>
								}
							/>
						</div>
					</div>
				))}
			</div>
		</aside>
	);
};
