'use client';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { ModalProps } from '../model/modal.types';

export const Modal: FC<ModalProps> = ({
	children,
	title,
	description,
	renderTrigger,
	openText,
	confirmText,
	closeText,
	formId,
	isLoading,
	isOpen,
	setIsOpen,
}) => {
	const { t: tCommon } = useTranslation('common');

	return (
		<div>
			<Dialog
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<DialogTrigger asChild>{renderTrigger ?? <Button variant="outline">{openText}</Button>}</DialogTrigger>
				<DialogContent className="sm:max-w-sm">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>
					{children}
					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant="outline"
								form={formId}
							>
								{closeText ?? tCommon('modal.close')}
							</Button>
						</DialogClose>
						<Button
							type="submit"
							form={formId}
							isLoading={isLoading}
						>
							{confirmText ?? tCommon('modal.confirm')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};
