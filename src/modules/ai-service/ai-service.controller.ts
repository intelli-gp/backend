import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AiServiceService } from './ai-service.service';
import { SendMessageDto } from './dto';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { SerializedChatbotMessages } from './serialized-types/chatbot_messages.serializer';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { ChatbotMessageExample } from './swagger-examples/chatbot-message.example';
import { ProSubscriptionGuard } from 'src/common/guards/pro-subscription.guard';

@ApiTags('Ai-Service')
@ApiBearerAuth()
@Controller('ai-service')
@UseGuards(ProSubscriptionGuard)
export class AiServiceController {
    private readonly logger = new Logger(AiServiceController.name);
    constructor(private readonly aiServiceService: AiServiceService) {}

    @ApiAcceptedResponse({
        status: 200,
        description: 'Chat with chatbot',
        schema: swaggerSuccessExample(null, ChatbotMessageExample),
    })
    @Post('chat')
    async chatWithChatbot(
        @Body() messageData: SendMessageDto,
        @GetCurrentUser('user_id') userId: number,
    ) {
        const response = await this.aiServiceService.chatWithChatbot(
            messageData.Content,
            userId,
        );
        return sendSuccessResponse(new SerializedChatbotMessages(response));
    }

    @ApiAcceptedResponse({
        status: 200,
        description: 'List chatbot messages',
        schema: swaggerSuccessExample(null, ChatbotMessageExample),
    })
    @Get('chat')
    async listMessages(@GetCurrentUser('user_id') userId: number) {
        const messages = await this.aiServiceService.listMessages(userId);
        return sendSuccessResponse(
            messages.map((message) => new SerializedChatbotMessages(message)),
        );
    }
}
