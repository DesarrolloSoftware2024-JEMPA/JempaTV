import { EntityDto } from "@abp/ng.core";


export interface NotificationDto extends EntityDto<number> {
    title?: string;
    content?: string;
    read?:boolean;
    fecha:Date;
    fechaFormateada: string;
}
  