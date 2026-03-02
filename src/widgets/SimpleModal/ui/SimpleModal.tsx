'use client';

import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { SimpleModalProps } from '../model/simpleModal.types';

export const SimpleModal: FC<SimpleModalProps> = ({ title, description, isLoading, confirmText, openText, closeText, onSuccess, onCancel, renderTrigger }) => {
	const { t: tCommon } = useTranslation('common');
	const [isOpen, setIsOpen] = useState<boolean>(false);
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
					<DialogFooter>
						<DialogClose asChild>
							<Button
								variant="outline"
								onClick={() => onCancel?.()}
							>
								{closeText ?? tCommon('modal.close')}
							</Button>
						</DialogClose>
						<Button
							type="submit"
							isLoading={isLoading}
							onClick={() => {
								onSuccess();
								setIsOpen(false);
							}}
						>
							{confirmText ?? tCommon('modal.confirm')}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
};
