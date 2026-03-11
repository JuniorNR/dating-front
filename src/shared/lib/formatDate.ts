import { format } from 'date-fns';

export const formatDate = (date: string | Date, formatDate: string = 'dd.MM.yyyy hh:mm') => {
	return format(new Date(date), formatDate);
};
