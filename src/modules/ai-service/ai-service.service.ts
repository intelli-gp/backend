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

    private machineLearningVideo =
        'https://asset.cloudinary.com/demxyvw8w/e530bab9ebc308e4b7fb22882b33de79';

    private dockerVideo = 'Docker video';

    private stockMarketVideo = 'Stock market video';

    private videosArray = [
        this.machineLearningVideo,
        this.dockerVideo,
        this.stockMarketVideo,
    ];
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
            return this.videosArray[0];
        } else if (prompt.includes('docker') || prompt.includes('container')) {
            return this.videosArray[1];
        } else if (prompt.includes('stock') || prompt.includes('market')) {
            return this.videosArray[2];
        } else {
            await wait(10000);
            throw new GatewayTimeoutException('Video generation timeout');
        }
    }
}
