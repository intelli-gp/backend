import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SerializedUser } from 'src/modules/users/serialized-types/serialized-user';
import { sendSuccessResponse } from 'src/utils/response-handler/success.response-handler';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetCurrentUser } from '../auth/ParamDecorator';
import { Prisma, user } from '@prisma/client';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { swaggerSuccessExample } from 'src/utils/swagger/example-generator';
import { SwaggerLoginExample } from '../auth/swagger-examples';
import { GetSingleUserByIdDto, GetSingleUserDto } from './dto/get-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  private readonly usersControllerLogger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    schema: swaggerSuccessExample(SwaggerLoginExample),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation or a constraint error',
  })
  async update(@GetCurrentUser() userData: user, @Body() data: UpdateUserDto) {
    const updatedUser = new SerializedUser(
      await this.usersService.updateUser(userData, data),
    );
    return sendSuccessResponse({
      updatedUser,
    });
  }

  @Get('/:Username')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    schema: swaggerSuccessExample(SwaggerLoginExample),
  })
  async getSingleUser(@Param() dto: GetSingleUserDto) {
    const foundUser = await this.usersService.getUserByUsername(dto.Username);

    return sendSuccessResponse({
      user: new SerializedUser(foundUser as Prisma.userWhereInput),
    });
  }

  @Get('/toggle-follow/:userId([0-9]+)')
  async followUser(
    @GetCurrentUser('user_id') followerId: number,
    @Param() FollowedUserData: GetSingleUserByIdDto,
  ) {
    const FollowingCount = await this.usersService.toggleFollowUser(
      followerId,
      FollowedUserData.userId,
    );

    this.usersControllerLogger.log(
      `User with id: ${followerId} followed user with id: ${FollowedUserData.userId}`,
    );

    return sendSuccessResponse({
      FollowingCount,
    });
  }
}
