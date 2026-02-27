import { CreateRoleDto, RoleEntity, UpdateRoleDto } from '@/shared/api/ApiGenerated';
import { BaseState } from '@/shared/types';

export interface RoleState extends BaseState {
	roles: RoleEntity[] | null;
	isInitialized: boolean;
	getRoles: () => Promise<void>;
	addRole: (dto: CreateRoleDto) => Promise<void>;
	updateRole: (id: number, dto: UpdateRoleDto) => Promise<void>;
	deleteRole: (id: number) => Promise<void>;
	getRoleFromStore: (id: number) => RoleEntity | null;
	reset: () => void;
}
