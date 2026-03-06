import { AnnouncementEntity } from '@/shared/api/ApiGenerated';
import { BaseFormModal } from '@/shared/types';

export interface CreateAnnouncementFormProps extends BaseFormModal {}
export interface UpdateAnnouncementFormProps extends BaseFormModal {
	announcement?: AnnouncementEntity;
}
