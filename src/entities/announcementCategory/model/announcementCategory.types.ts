import { AnnouncementCategoryEntity, CreateAnnouncementCategoryDto, UpdateAnnouncementCategoryDto } from '@/shared/api/ApiGenerated';
import { BaseState } from '@/shared/types';

export interface AnnouncementCategoryState extends BaseState<AnnouncementCategoryEntity, CreateAnnouncementCategoryDto, UpdateAnnouncementCategoryDto> {}
