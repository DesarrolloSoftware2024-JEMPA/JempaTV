import type { EntityDto } from '@abp/ng.core';

export interface UserDto extends EntityDto<number> {
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  emailNotification?: boolean;
}