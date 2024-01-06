import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { user } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @HttpCode(HttpStatus.CREATED)
  @UseFilters()
  async update(@GetCurrentUser() userData: user, @Body() data: UpdateUserDto) {
    const updatedUser = new SerializedUser(
      await this.usersService.updateUser(userData, data),
    );
    return sendSuccessResponse({
      data: updatedUser,
    });
  }
}
