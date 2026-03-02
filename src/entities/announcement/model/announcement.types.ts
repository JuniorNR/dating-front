import { AnnouncementEntity, CreateAnnouncementDto } from '@/shared/api/ApiGenerated';
import { BaseState } from '@/shared/types';

export interface AnnouncementState extends BaseState<AnnouncementEntity, CreateAnnouncementDto, CreateAnnouncementDto> {}
