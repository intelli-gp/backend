import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ReceivedChatResponse } from './types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from 'src/utils/config-validation.schema';

@Injectable()
export class AiServiceService {
    private readonly logger = new Logger(AiServiceService.name);
    private generativeModel;
    constructor(
        private readonly aiServiceApi: HttpService,
        private readonly configService: ConfigService<ConfigSchema>,
    ) {
        const genAI = new GoogleGenerativeAI(
            this.configService.get('GEMINI_API_KEY'),
        );

        this.generativeModel = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
        });
    }

    async chatWithChatbot(message: string) {
        this.logger.log('Chat with chatbot');
        // const { data }: { data: ReceivedChatResponse[] } =
        //     await this.aiServiceApi.axiosRef.post('/webhooks/rest/webhook', {
        //         sender: 'user',
        //         message,
        //     });
        // this.logger.debug(data);

        const result = await this.generativeModel.generateContent(message);
        const res = await result.response;

        return res.text;
    }
}
