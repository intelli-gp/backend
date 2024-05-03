import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentMethodService } from './payment-method.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { GetPaymentMethodsDto, UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { ApiResponse } from '@nestjs/swagger';
import { SerializedPaymentMethod } from './serialized-types/serialized-payment-method';

@Controller('payment-method')
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}
  @ApiResponse({
    status: 201,
    description: 'Returns created payment method',
  })
  @Post()
  async createPaymentMethod(
    @Body() PaymentMethodData: CreatePaymentMethodDto,
    @GetCurrentUser('user_id') userId: number,
  ) {
    const createdPaymentMethod = await this.paymentMethodService.createPaymentMethod(
      PaymentMethodData,
      userId,
    );
    return sendSuccessResponse(createdPaymentMethod);
  }


  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all payment methods',
  })
  @Get()
  async getPaymentMethods(
    @GetCurrentUser('user_id') userId: number,) {
    return sendSuccessResponse(
      (await this.paymentMethodService.getAllPaymentMethods(userId)).map(
        (paymentMethod) => new SerializedPaymentMethod(paymentMethod),
      ))
 
  }
 


  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentMethodDto: UpdatePaymentMethodDto) {
  //   return this.paymentMethodService.update(+id, updatePaymentMethodDto);
  // }

  @Delete('/:ID([0-9]+)')
  async deletePaymentMethod(
    @Param() dto:GetPaymentMethodsDto,
    @GetCurrentUser('user_id') userId:number,
  ) {
    await this.paymentMethodService.deletePaymentMethod(dto.ID, userId);
    return sendSuccessResponse('Group deleted successfully');
  }
}
