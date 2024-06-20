import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiServiceService } from './ai-service.service';
import { SendMessageDto } from './dto';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { Public, SecondFactorPublic } from '../auth/ParamDecorator';

@ApiTags('Ai-Service')
@Controller('ai-service')
export class AiServiceController {
    private readonly logger = new Logger(AiServiceController.name);
    constructor(private readonly aiServiceService: AiServiceService) {}


    @Post('chat')
    async chatWithChatbot(@Body() messageData: SendMessageDto) {
        const response = await this.aiServiceService.chatWithChatbot(
            messageData.Content,
        );
        return sendSuccessResponse(response);
    }
}
