'use client';
import { FC } from 'react';
import { Pane, SplitPane, usePersistence } from 'react-split-pane';
import { Button } from '@/shared/ui/button';
import { Input } from '@/widgets';

export const Chat: FC = () => {
	const [sizes, setSizes] = usePersistence({
		key: 'chatLayout',
		debounce: 500,
	});

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
					<aside className="min-h-0 h-full overflow-y-auto border-r border-border bg-muted/25">
						<header className="flex h-[50px] items-center border-b border-r border-border bg-secondary/70 px-4">
							<h2 className="text-sm font-semibold text-primary">Чаты</h2>
						</header>
						<div className="space-y-2 p-2">
							<Button
								type="button"
								variant="outline"
								className="h-auto w-full items-start justify-start rounded-sm border-primary/40 bg-primary/10 px-3 py-2 text-left dark:border-primary/70 dark:bg-primary/25 dark:text-primary-foreground dark:shadow-[0_0_0_1px_hsl(var(--primary)/0.35)]"
							>
								<div className="w-full">
									<div className="flex items-center justify-between">
										<p className="text-sm font-semibold text-primary">Support</p>
										<span className="rounded-full border border-primary/30 bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">2</span>
									</div>
									<p className="mt-0.5 truncate text-xs text-muted-foreground">Новый ответ по заявке</p>
								</div>
							</Button>
							<Button
								type="button"
								variant="outline"
								className="h-auto w-full items-start justify-start rounded-sm bg-secondary/70 px-3 py-2 text-left"
							>
								<div className="w-full">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium">Анна</p>
										<span className="text-[10px] text-muted-foreground">12:40</span>
									</div>
									<p className="mt-0.5 truncate text-xs text-muted-foreground">Спасибо!</p>
								</div>
							</Button>
							<Button
								type="button"
								variant="outline"
								className="h-auto w-full items-start justify-start rounded-sm bg-secondary/70 px-3 py-2 text-left"
							>
								<div className="w-full">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium">Игорь</p>
										<span className="text-[10px] text-muted-foreground">Вчера</span>
									</div>
									<p className="mt-0.5 truncate text-xs text-muted-foreground">Увидимся завтра</p>
								</div>
							</Button>
							<Button
								type="button"
								variant="outline"
								className="h-auto w-full items-start justify-start rounded-sm bg-secondary/70 px-3 py-2 text-left"
							>
								<div className="w-full">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium">Команда</p>
										<span className="text-[10px] text-muted-foreground">Пн</span>
									</div>
									<p className="mt-0.5 truncate text-xs text-muted-foreground">Обновление готово</p>
								</div>
							</Button>
						</div>
					</aside>
				</Pane>
				<Pane
					size={sizes[1]}
					className="min-h-0 h-full"
					minSize={600}
				>
					<section className="flex min-h-0 h-full flex-col bg-secondary/50">
						<header className="flex h-[50px] items-center justify-between border-b border-border bg-secondary/70 px-4">
							<div>
								<p className="text-sm font-semibold text-primary">Support</p>
								<p className="text-xs text-muted-foreground">online</p>
							</div>
							<Button
								type="button"
								size="sm"
								variant="outline"
								className="rounded-sm"
							>
								Подробнее
							</Button>
						</header>
						<div className="flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-y-auto p-4">
							<div className="max-w-1/2 w-fit rounded-xl border border-border bg-accent/60 px-3 py-2 text-sm">Здравствуйте! Чем могу помочь?</div>
							<div className="ml-auto max-w-1/2 w-fit rounded-xl bg-primary/15 px-3 py-2 text-sm">Нужна помощь с подпиской.</div>
							<div className="max-w-1/2 w-fit rounded-xl border border-border bg-accent/60 px-3 py-2 text-sm">Здравствуйте! Чем могу помочь?</div>
						</div>

						<footer className="p-3">
							<div className="flex items-center gap-2">
								<Input
									placeholder="Напишите сообщение..."
									className="rounded-sm"
								/>
								<Button
									type="button"
									variant="secondary"
									className="rounded-sm"
								>
									Отправить
								</Button>
							</div>
						</footer>
					</section>
				</Pane>
			</SplitPane>
		</section>
	);
};
