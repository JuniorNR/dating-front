import { AnnouncementEntity } from '@/shared/api/ApiGenerated';

export interface AnnouncementsItemProps {
	announcement: AnnouncementEntity;
	canEdit: boolean;
	onDelete: (id: number) => void;
}
