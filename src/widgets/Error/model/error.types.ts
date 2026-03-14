type ErrorPayload = {
	error?: string;
	message?: string;
	statusCode?: number;
};

export type ErrorComponentProps = {
	error?: ErrorPayload | null;
	className?: string;
	isGlobal?: boolean;
};
