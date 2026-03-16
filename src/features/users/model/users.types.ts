import { UserEntity } from '@/shared/api/ApiGenerated';
import { BaseFormModal } from '@/shared/types';

export interface UpdateUserFormProps extends BaseFormModal {
	user: UserEntity;
}
