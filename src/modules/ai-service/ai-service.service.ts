import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ReceivedChatResponse } from './types';

@Injectable()
export class AiServiceService {
  private readonly logger = new Logger(AiServiceService.name);
  constructor(private readonly aiServiceApi: HttpService) {}

  async chatWithChatbot(message: string) {
    this.logger.log('Chat with chatbot');
    const { data }: { data: ReceivedChatResponse[] } =
      await this.aiServiceApi.axiosRef.post('/webhooks/rest/webhook', {
        sender: 'user',
        message,
      });
    this.logger.debug(data);
    return data[0].text;
  }
}
