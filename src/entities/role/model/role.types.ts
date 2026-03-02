import { CreateRoleDto, RoleEntity, UpdateRoleDto } from '@/shared/api/ApiGenerated';
import { BaseState } from '@/shared/types';

export interface RoleState extends BaseState<RoleEntity, CreateRoleDto, UpdateRoleDto> {}
