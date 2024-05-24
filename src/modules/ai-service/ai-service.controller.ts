import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AiServiceService } from './ai-service.service';
import { SendMessageDto } from './dto';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { ProSubscriptionGuard } from 'src/common/guards/pro-subscription.guard';

@ApiTags('Ai-Service')
@UseGuards(ProSubscriptionGuard)
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
