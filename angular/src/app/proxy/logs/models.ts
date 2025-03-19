import type { EntityDto } from '@abp/ng.core';

export interface LogDto extends EntityDto<number> {
  username?: string;
  executionTime?: string;
  executionDuration: number;
  httpMethod?: string;
  url?: string;
  exceptions?: string;
  httpStatusCode?:number;
}
