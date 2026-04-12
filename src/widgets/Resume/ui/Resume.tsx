import { FC } from 'react';
import { Span } from '@/shared/ui/span';
import { ResumeHeader } from './ResumeHeader';

export const Resume: FC = () => {
	return (
		<div className="mt-10">
			<ResumeHeader />
			<div className="mt-10 grid grid-cols-2 shadow-2xl shadow-black border">
				<div className="relative overflow-hidden border border-border bg-linear-to-br from-muted/40 via-background to-background p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-foreground/30 hover:from-muted/70 hover:shadow-black/40">
					<h2 className="mb-4 pl-3 text-3xl font-semibold tracking-wide text-foreground">Обо мне</h2>
					<div className="space-y-3 pl-3 text-lg leading-relaxed text-foreground/90">
						<p>
							Являюсь <Span color="blue">middle frontend</Span> разработчиком и развиваюсь в этой сфере. Так же посматриваю на
							<Span color="green"> backend</Span> и <Span color="orange">devops</Span> обязанности.
						</p>
						<p>
							Могу начать проект с формирования архитектуры проекта на <Span color="blue">react</Span>, <Span color="blue">typescript</Span>,{' '}
							<Span color="blue">next.js</Span> и доведения его до MVP.
						</p>
						<p>Считаю себя самостоятельным и вижу свое развитие только в разработке web/desktop приложений.</p>
					</div>
				</div>
				<div className="relative overflow-hidden border border-border bg-linear-to-br from-muted/40 via-background to-background p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-foreground/30 hover:from-muted/70 hover:shadow-black/40">
					<h2 className="mb-4 pl-3 text-3xl font-semibold tracking-wide text-foreground">Опыт коммерческой разработки</h2>
					<ul className="space-y-4 pl-3 text-base leading-relaxed text-foreground/90">
						<li>
							<h3 className="text-xl font-semibold text-foreground">Frontend Developer (Лига Цифровых Технологий)</h3>
							<p className="mt-2 text-muted-foreground">
								Я занимался разработкой web-приложений для внутреннего использования компании. Работал с <Span color="blue">react</Span>,{' '}
								<Span color="blue">typescript</Span>. Работал с <Span color="red">confluence</Span>.
							</p>
							<p className="mt-2 inline-block border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-sm font-medium text-violet-200">
								Опыт работы: 2 года и 1 месяц
							</p>
							<ul className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
								<li className="border border-violet-400/30 bg-violet-500/10 p-4 transition-all duration-300 hover:border-violet-300/70 hover:bg-violet-500/20">
									<h3 className="text-lg font-semibold text-violet-200">Проект: Облачные решения Ростелеком</h3>
									<p className="mt-2 text-sm leading-relaxed text-foreground/85">
										Проект был написан на <Span color="blue">React 16</Span>, <Span color="blue">redux-toolkit</Span>, <Span color="blue">typescript</Span>. Моя
										роль была <Span color="blue">frontend</Span> разработчиком. Я занимался разработкой новых компонентов и страниц, оптимизацией существующего
										кода и рефакторингом классовых компонентов на функциональные. Работал с <Span color="red">confluence</Span>, таймменеджмент велся через{' '}
										<Span color="red">jira</Span>.
									</p>
								</li>
								<li className="border border-violet-400/30 bg-violet-500/10 p-4 transition-all duration-300 hover:border-violet-300/70 hover:bg-violet-500/20">
									<h3 className="text-lg font-semibold text-violet-200">Проект: Облачные решения Внутренней компании</h3>
									<p className="mt-2 text-sm leading-relaxed text-foreground/85">
										Проект был написан на <Span color="blue">React 16</Span>, <Span color="blue">redux-toolkit</Span>. Обновлял <Span color="blue">react</Span>{' '}
										на 18, интегрировал <Span color="blue">typescript</Span>, внедрял <Span color="blue">FSD</Span>, <Span color="orange">eslint</Span>,{' '}
										<Span color="orange">prettier</Span>, <Span color="orange">husky</Span> и в целом <Span color="orange">CI</Span>.
									</p>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className="relative col-span-2 overflow-hidden border border-border bg-linear-to-br from-muted/40 via-background to-background p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-foreground/30 hover:from-muted/70 hover:shadow-black/40">
					<h2 className="mb-4 pl-3 text-3xl font-semibold tracking-wide text-foreground">Hard skills</h2>
					<ul className="grid grid-cols-1 gap-4 pl-3 xl:grid-cols-2">
						<li className="border border-red-500/30 bg-red-500/5 p-4">
							<h3 className="text-xl font-semibold text-red-300">Инструменты командной разработки</h3>
							<ul className="mt-3 space-y-2">
								<li className="group relative overflow-hidden border border-red-400/30 bg-red-500/10 p-3 transition-all duration-300 hover:border-red-300/70 hover:bg-red-500/20">
									<h4 className="text-base font-semibold">
										<Span color="red">GitLab / GitHub</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Работал через pull/merge request, code review и модель ветвления <Span color="red">gitflow</Span>.
									</p>
								</li>
								<li className="group relative overflow-hidden border border-red-400/30 bg-red-500/10 p-3 transition-all duration-300 hover:border-red-300/70 hover:bg-red-500/20">
									<h4 className="text-base font-semibold">
										<Span color="red">Jira</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Средний</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Использовал <Span color="red">Jira</Span> для ведения задач, декомпозиции, оценки сроков и контроля прогресса спринта.
									</p>
								</li>

								<li className="group relative overflow-hidden border border-red-400/30 bg-red-500/10 p-3 transition-all duration-300 hover:border-red-300/70 hover:bg-red-500/20">
									<h4 className="text-base font-semibold">
										<Span color="red">Confluence</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Низкий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Поддерживал техническую документацию, описывал архитектурные решения и рабочие процессы в <Span color="red">Confluence</Span>.
									</p>
								</li>
							</ul>
						</li>
						<li className="border border-blue-500/30 bg-blue-500/5 p-4">
							<h3 className="text-xl font-semibold text-blue-300">Frontend</h3>
							<ul className="grid grid-cols-2 gap-2 mt-3">
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">React</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Опыт работы с <Span color="blue">React</Span> около 4 лет
									</p>
								</li>
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">Next.js</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Опыт работы с <Span color="blue">Next.js</Span> около года
									</p>
								</li>
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">TypeScript</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Пишу на <Span color="blue">TypeScript</Span> и типизирую все, что смогу увидеть, код веду без any
									</p>
								</li>
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">FSD</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Строю масштабируемую структуру приложения с разделением ответственности по слоям и фичам. Все примеры можно посмотреть в моих проектах
									</p>
								</li>
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">Zustand / Redux Toolkit / MobX</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Средне-высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Пишу сторы с минимальным бойлерплейтом. Любой state manager для меня подходит.
									</p>
								</li>
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">React Query / RTK Query</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Средне-высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Оба использую в своих pet-проектах
									</p>
								</li>
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">Material UI / shadcn / ChakraUI</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Средне-высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										В каждом pet-проекте стараюсь использовать какой-то новый UI-kit
									</p>
								</li>
								<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-3 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
									<h4 className="text-base font-semibold">
										<Span color="blue">TailwindCSS / Styled Components / SCSS / CSS Modules</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Средне-высокий</p>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Всеми этими подходами в стилизации владею. Styled components использовал в связке с библиотекой <Span color="blue">Emotion</Span> и{' '}
										<Span color="blue">Material UI</Span>.
									</p>
								</li>
							</ul>
						</li>
						<li className="border border-green-500/30 bg-green-500/5 p-4">
							<h3 className="text-xl font-semibold text-green-300">Backend</h3>
							<ul className="mt-3 space-y-2">
								<li className="group relative overflow-hidden border border-green-400/30 bg-green-500/10 p-3 transition-all duration-300 hover:border-green-300/70 hover:bg-green-500/20">
									<h4 className="text-base font-semibold">
										<Span color="green">Node.js / Nest.js</Span>
									</h4>
									<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-3 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										Пишу API на <Span color="green">Node.js</Span> и <Span color="green">Nest.js</Span>, строю модульную серверную архитектуру.
									</p>
								</li>
								<li className="group relative overflow-hidden border border-green-400/30 bg-green-500/10 p-3 transition-all duration-300 hover:border-green-300/70 hover:bg-green-500/20">
									<h4 className="text-base font-semibold">
										<Span color="green">REST / SQL / Auth</Span>
									</h4>
									<p className="max-h-0 overflow-hidden text-sm leading-relaxed text-foreground/85 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
										Реализую CRUD, авторизацию и интеграции сервисов, уделяя внимание безопасности и предсказуемости контрактов.
									</p>
								</li>
							</ul>
						</li>
						<li className="border border-orange-500/30 bg-orange-500/5 p-4">
							<h3 className="text-xl font-semibold text-orange-300">DevOps (CI/CD)</h3>
							<ul className="mt-3 space-y-2">
								<li className="group relative overflow-hidden border border-orange-400/30 bg-orange-500/10 p-3 transition-all duration-300 hover:border-orange-300/70 hover:bg-orange-500/20">
									<h4 className="text-base font-semibold">
										<Span color="orange">Docker</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Средний</p>
									<p className="max-h-0 overflow-hidden text-sm leading-relaxed text-foreground/85 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
										Есть опыт работы с <Span color="orange">Docker</Span> и <Span color="orange">Docker Compose</Span> для локального и удаленного развертывания
										приложений. Как коммерческий опыт, так и личные проекты
									</p>
								</li>
								<li className="group relative overflow-hidden border border-orange-400/30 bg-orange-500/10 p-3 transition-all duration-300 hover:border-orange-300/70 hover:bg-orange-500/20">
									<h4 className="text-base font-semibold">
										<Span color="orange">Playwright / React Testing Library / Jest</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Средний</p>
									<p className="max-h-0 overflow-hidden text-sm leading-relaxed text-foreground/85 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
										Итеграционные тесты пишу на <Span color="orange">Playwright</Span>, тестирование компонентов через
										<Span color="orange"> React Testing Library</Span> и тест кода на
										<Span color="orange"> Jest</Span>
									</p>
								</li>
								<li className="group relative overflow-hidden border border-orange-400/30 bg-orange-500/10 p-3 transition-all duration-300 hover:border-orange-300/70 hover:bg-orange-500/20">
									<h4 className="text-base font-semibold">
										<Span color="orange">Eslint / Biome / Prettier / Husky / PreCommit hooks</Span>
									</h4>
									<p className="text-sm text-foreground/85">Уровень владения: Высокий</p>
									<p className="max-h-0 overflow-hidden text-sm leading-relaxed text-foreground/85 opacity-0 transition-all duration-300 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
										Могу настроить любой линтер и форматер с нуля
									</p>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className="relative col-span-2 border border-border bg-linear-to-br from-muted/40 via-background to-background p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-foreground/30 hover:from-muted/70 hover:shadow-black/40">
					<h2 className="mb-4 pl-3 text-3xl font-semibold tracking-wide text-foreground">Дополнительные навыки</h2>
					<ul className="grid grid-cols-1 gap-3 pl-3 xl:grid-cols-3">
						<li className="group relative overflow-visible border border-blue-400/30 bg-blue-500/10 p-4 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
							<h3 className="text-lg font-semibold">
								<Span color="blue">RestAPI</Span>
							</h3>
							<p className="mt-2 text-sm text-foreground/85">Уровень владения: Высокий</p>
							<p className="pointer-events-none absolute left-0 top-0 z-20 w-full min-h-full border border-blue-300/70 bg-background/95 p-4 text-sm leading-relaxed text-foreground/90 opacity-0 shadow-lg shadow-black/30 transition-opacity duration-300 group-hover:opacity-100">
								Понимание работы как со стороны <Span color="blue">frontend</Span>, так и с <Span color="green">backend</Span>. Понимание работы как со стороны{' '}
								<Span color="blue">frontend</Span>, так и с <Span color="green">backend</Span>. Понимание работы как со стороны{' '}
								<Span color="blue">frontend</Span>, так и с <Span color="green">backend</Span>. Понимание работы как со стороны{' '}
								<Span color="blue">frontend</Span>, так и с <Span color="green">backend</Span>. Понимание работы как со стороны{' '}
								<Span color="blue">frontend</Span>, так и с <Span color="green">backend</Span>.
							</p>
						</li>
						<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-4 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
							<h3 className="text-lg font-semibold">
								<Span color="blue">Web Sockets</Span>
							</h3>
							<p className="mt-2 text-sm text-foreground/85">Уровень владения: Средний</p>
							<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-4 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								Понимание как со стороны <Span color="blue">frontend</Span>, так и <Span color="green">backend</Span>.
							</p>
						</li>
						<li className="group relative overflow-hidden border border-blue-400/30 bg-blue-500/10 p-4 transition-all duration-300 hover:border-blue-300/70 hover:bg-blue-500/20">
							<h3 className="text-lg font-semibold">
								<Span color="blue">JWT авторизация</Span>
							</h3>
							<p className="mt-2 text-sm text-foreground/85">Уровень владения: Средний</p>
							<p className="pointer-events-none absolute inset-0 z-10 overflow-y-auto bg-background/95 p-4 text-sm leading-relaxed text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								Понимание как со стороны <Span color="blue">frontend</Span>, так и <Span color="green">backend</Span>.
							</p>
						</li>
					</ul>
				</div>
			</div>
			<div className="relative overflow-hidden border border-border bg-linear-to-br from-muted/40 via-background to-background p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-foreground/30 hover:from-muted/70 hover:shadow-black/40">
				<h2 className="mb-4 pl-3 text-3xl font-semibold tracking-wide text-foreground">Soft skills</h2>
				<ul>
					<li>
						<h3>Коммуникабельность</h3>
						<p>Этот пункт не для галочки, а я действительно быстро отвечаю и со мной легко связаться</p>
					</li>
				</ul>
			</div>
			<div className="relative overflow-hidden border border-border bg-linear-to-br from-muted/40 via-background to-background p-6 shadow-lg shadow-black/20 transition-all duration-300 hover:border-foreground/30 hover:from-muted/70 hover:shadow-black/40">
				<h2 className="mb-4 pl-3 text-3xl font-semibold tracking-wide text-foreground">Языки</h2>
				<ul>
					<li>
						<h3>Русский</h3>
						<p>Родной</p>
					</li>
					<li>
						<h3>Английский</h3>
						<p>A2, читаю документацию, немного говорю</p>
					</li>
				</ul>
			</div>
		</div>
	);
};
