import type { EntityDto } from '@abp/ng.core';

export interface UserDto extends EntityDto<number> {
  username?: string;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  emailNotification?: boolean;
}

export interface LogDto extends EntityDto<number> {
  username?: string;
  executionTime?: string;
  executionDuration: number;
  httpMethod?: string;
  url?: string;
  exceptions?: string;
  httpStatusCode?:number;
}
