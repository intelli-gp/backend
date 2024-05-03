import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentMethodService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPaymentMethod(data: CreatePaymentMethodDto, userId: number) {
    const {  holderName, cardId,cardNumber,expiryDate } = data;
    const addedPaymentMethod = await this.prismaService.payment_method.create({
      data: {
        holder_name:holderName,
        user_id: userId,
        card_number:cardNumber,
        expiry_date: new Date(expiryDate),
      },
      include:{
        user: true,
      }
    })
    return addedPaymentMethod;
  }


  async getAllPaymentMethods( userId: number) {
    const paymentMethods = await this.prismaService.payment_method.findMany({
      where: {
        user_id: userId,
      },
    })  .catch((err) => {
      throw new BadRequestException({ error: err });
    });
    return paymentMethods;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} paymentMethod`;
  // }

  // update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto) {
  //   return `This action updates a #${id} paymentMethod`;
  // }

  async deletePaymentMethod(PaymentMethodId: number, userId: number): Promise<string> {
    if (!PaymentMethodId)
      throw new BadRequestException('Payment Method Id is required');
    const deletedPaymentMethod = await this.prismaService.payment_method.delete({
      where: {
        method_id: PaymentMethodId,
      },
    });
    if (!deletedPaymentMethod) {
      throw new ForbiddenException(
        'Payment Method not found.',
      );
    }
    return 'Payment Method deleted successfully';
  }
}
