'use client';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
	const { t: tCommon } = useTranslation('common');

	return <div>{tCommon('home.title')}</div>;
};

export default HomePage;
