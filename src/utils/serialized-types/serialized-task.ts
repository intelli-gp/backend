import { task } from '@prisma/client';

export class SerializedTask {
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  status: string;

  constructor(partial: Partial<task>) {
    Object.assign(this, partial);
  }
}
