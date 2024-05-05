import { Prisma } from "@prisma/client";

export class SerializedAttachment{
    ID: number;
    MessageID: number;
    Content: string;
    Type: string;
   
    constructor(partial: Partial<Prisma.attachmentWhereInput>) {
      this.ID = +partial?.attachment_id
      this.MessageID = +partial?.message_id 
      this.Content = partial?.content as string
      this.Type = partial?.type as string
    }
  
  }