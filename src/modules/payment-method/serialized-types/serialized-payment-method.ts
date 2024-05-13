import { Prisma, payment_method, user } from '@prisma/client';
import { Exclude, Expose, Transform } from 'class-transformer';

export class SerializedPaymentMethod {
    ID: number;
    @Exclude()
    user_id: number;
    holderName: string;
    cardId: string;
    cardNumber: string;
    expiryDate: Date;
    constructor(partial: Partial<Prisma.payment_methodWhereInput>) {
        this.ID = +partial?.method_id;
        this.holderName = partial?.holder_name as string;
        this.cardNumber = partial?.card_number as string;
        this.expiryDate = partial?.expiry_date as Date;
    }
}
