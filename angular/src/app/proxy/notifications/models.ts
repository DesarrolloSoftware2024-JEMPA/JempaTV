import { EntityDto } from "@abp/ng.core";

export interface NotificationDto extends EntityDto<number> {
    title?: string;
    user?: string;
    content?: string;
    type?: string;
    read?:boolean;
    fecha:Date;
    fechaFormateada: string;
  }
  