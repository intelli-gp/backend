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
import { SerializedUser } from 'src/utils/serialized-types/serialized-user';
import { sendSuccessResponse } from 'src/utils/response.handler';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetCurrentUser } from '../auth/ParamDecorator';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update/:id')
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.BAD_REQUEST)
  @UseFilters()
  async update(
    @GetCurrentUser('user_id') user_id: number,
    @Body() data: UpdateUserDto,
  ) {
    const updatedUser = new SerializedUser(
      await this.usersService.updateUser(user_id, data),
    );
    return sendSuccessResponse({
      data: updatedUser,
    });
  }
}
