import { HttpService } from '@nestjs/axios';
import { GatewayTimeoutException, Injectable, Logger } from '@nestjs/common';
import { ReceivedChatResponse } from './types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from 'src/utils/config-validation.schema';
import { PrismaService } from '../prisma/prisma.service';

async function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

@Injectable()
export class AiServiceService {
    private readonly logger = new Logger(AiServiceService.name);
    private generativeModel;

    private videosArray = {
        machineLearning:
            'https://res.cloudinary.com/demxyvw8w/video/upload/v1719085758/machine-learning-long_qsbix3.mp4',
        docker: 'https://res.cloudinary.com/demxyvw8w/video/upload/v1719085825/docker_f3bilw.mp4',
        stockMarket:
            'https://res.cloudinary.com/demxyvw8w/video/upload/v1719088497/stock_market_dlt4gm.mp4',
    };

    constructor(
        private readonly aiServiceApi: HttpService,
        private readonly configService: ConfigService<ConfigSchema>,
        private readonly prismaService: PrismaService,
    ) {
        const genAI = new GoogleGenerativeAI(
            this.configService.get('GEMINI_API_KEY'),
        );

        this.generativeModel = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
        });
    }

    async chatWithChatbot(message: string, userId: number) {
        this.logger.log('Chat with chatbot');
        // const { data }: { data: ReceivedChatResponse[] } =
        //     await this.aiServiceApi.axiosRef.post('/webhooks/rest/webhook', {
        //         sender: 'user',
        //         message,
        //     });
        // this.logger.debug(data);

        const result = await this.generativeModel.generateContent(message);
        const res = await result.response;
        const replyContent = res.text();

        return await this.prismaService.message_ai.create({
            data: {
                prompt: message,
                reply: replyContent,
                user_id: userId,
            },
        });
    }

    async listMessages(userId: number) {
        return this.prismaService.message_ai.findMany({
            where: {
                user_id: userId,
            },
            include: {
                user: {
                    select: {
                        image: true,
                        username: true,
                    },
                },
            },
        });
    }

    async generateVideo(prompt: string) {
        // Should save videos generated and link them to user
        prompt = prompt.toLowerCase();
        if (prompt.includes('machine')) {
            return this.videosArray.machineLearning;
        } else if (prompt.includes('docker') || prompt.includes('container')) {
            return this.videosArray.docker;
        } else if (prompt.includes('stock') || prompt.includes('market')) {
            return this.videosArray.stockMarket;
        } else {
            await wait(10000);
            throw new GatewayTimeoutException('Video generation timeout');
        }
    }
}
