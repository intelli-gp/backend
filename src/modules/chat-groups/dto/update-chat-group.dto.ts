import { PartialType } from '@nestjs/mapped-types';
import { CreateChatGroupDto } from './create-chat-group.dto';
import { OmitType } from '@nestjs/swagger';
import {
    IsArray,
    IsString,
    ArrayNotEmpty,
    ArrayMinSize,
    ArrayMaxSize,
    Length,
    IsOptional,
} from 'class-validator';

export class UpdateChatGroupDto extends PartialType(
    OmitType(CreateChatGroupDto, ['GroupTags'] as const),
) {
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(25)
    @Length(1, 512, { each: true })
    AddedGroupTags?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(25)
    @Length(1, 512, { each: true })
    RemovedGroupTags?: string[];
}
