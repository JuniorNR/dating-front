import { cva } from 'class-variance-authority';
import { ChevronDownIcon, LucideProps } from 'lucide-react';
import { NavigationMenu as NavigationMenuPrimitive } from 'radix-ui';
import * as React from 'react';

import { cn } from '@/shared/lib/cn';
import Link from 'next/link';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { Button } from './button';

function NavigationMenu({
	className,
	children,
	viewport = true,
	align = 'right',
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
	viewport?: boolean;
	align?: 'left' | 'right';
}) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			data-viewport={viewport}
			className={cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center', className)}
			{...props}
		>
			{children}
			{viewport && <NavigationMenuViewport align={align} />}
		</NavigationMenuPrimitive.Root>
	);
}

function NavigationMenuList({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn('group flex flex-1 list-none items-center justify-center gap-1', className)}
			{...props}
		/>
	);
}

function NavigationMenuItem({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn('relative', className)} {...props} />;
}

const navigationMenuTriggerStyle = cva(
	'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
);

function NavigationMenuTrigger({ className, children, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
	return (
		<NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" className={cn(navigationMenuTriggerStyle(), 'group', className)} {...props}>
			{children} <ChevronDownIcon className="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180" aria-hidden="true" />
		</NavigationMenuPrimitive.Trigger>
	);
}

function NavigationMenuContent({
	className,
	align = 'left',
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content> & {
	align?: 'left' | 'right';
}) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(
				'data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 p-2 pr-2.5 md:absolute',
				align === 'right' ? 'right-0' : 'left-0',
				'group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none',
				className,
			)}
			{...props}
		/>
	);
}

function NavigationMenuViewport({
	className,
	align = 'right',
	...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport> & {
	align?: 'left' | 'right';
}) {
	return (
		<div className={cn('absolute top-full isolate z-50 flex justify-center', align === 'right' ? 'right-0' : 'left-0')}>
			<NavigationMenuPrimitive.Viewport
				data-slot="navigation-menu-viewport"
				className={cn(
					'origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border shadow md:w-(--radix-navigation-menu-viewport-width)',
					className,
				)}
				{...props}
			/>
		</div>
	);
}

function NavigationMenuLink({ className, title, icon, description, href, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Link> & {
	href: string;
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
	title: string;
	description: string;
}) {
	const IconComponent = icon;
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			<Link href={href}>
				<div className="flex">
					{IconComponent && <IconComponent className="mr-2 mt-1" />}
					<div>
						<p className="text-sm font-medium whitespace-nowrap">{title}</p>
						<p className="text-sm text-muted-foreground whitespace-nowrap">{description}</p>
					</div>
				</div>
			</Link>
		</NavigationMenuPrimitive.Link>
	);
}

function NavigationMenuButton({ className, title, icon, description, onClick, color = 'default', ...props }: Omit<React.ComponentProps<typeof NavigationMenuPrimitive.Link>, 'href'> & {
	icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
	title: string;
	description: string;
	onClick: () => void;
	color?: 'default' | 'danger';
}) {
	const IconComponent = icon;
	const colorDangerClasses = color === 'danger' ? {
		mainClasses:
			'text-destructive border-destructive/20 bg-destructive/5 hover:bg-destructive/12 focus:bg-destructive/12 data-[active=true]:bg-destructive/12 data-[active=true]:text-destructive focus-visible:ring-destructive/35 dark:border-destructive/30 dark:bg-destructive/10 dark:hover:bg-destructive/20',
		iconClasses: 'text-destructive',
		titleClasses: 'text-destructive',
		descriptionClasses: 'text-destructive/80 dark:text-destructive/70',
	} : null;
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(
				"data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
				className,
				colorDangerClasses?.mainClasses,
			)}
			{...props}
		>
			<button onClick={onClick} className="text-left">
				<div className="flex">
					{IconComponent && <IconComponent className={cn('mr-2 mt-1', colorDangerClasses?.iconClasses)} />}
					<div>
						<p className={cn('text-sm font-medium whitespace-nowrap', colorDangerClasses?.titleClasses)}>{title}</p>
						<p className={cn('text-sm text-muted-foreground whitespace-nowrap', colorDangerClasses?.descriptionClasses)}>{description}</p>
					</div>
				</div>
			</button>
		</NavigationMenuPrimitive.Link>
	);
}

function NavigationMenuIndicator({ className, ...props }: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) {
	return (
		<NavigationMenuPrimitive.Indicator
			data-slot="navigation-menu-indicator"
			className={cn(
				'data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-1 flex h-1.5 items-end justify-center overflow-hidden',
				className,
			)}
			{...props}
		>
			<div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
		</NavigationMenuPrimitive.Indicator>
	);
}

export {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuItem,
	NavigationMenuContent,
	NavigationMenuTrigger,
	NavigationMenuLink,
	NavigationMenuButton,
	NavigationMenuIndicator,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
};
