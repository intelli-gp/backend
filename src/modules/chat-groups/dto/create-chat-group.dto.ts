import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray,
    IsString,
    Length,
} from 'class-validator';

export class CreateChatGroupDto {
    @ApiProperty({ example: 'Chat Group Title' })
    @IsString()
    GroupTitle: string;

    @ApiProperty({ example: 'Chat Group Description' })
    @IsString()
    GroupDescription: string;

    @ApiProperty({ example: 'https://chat-group-cover-image-url.com' })
    @IsString()
    GroupCoverImageUrl: string;

    @ApiProperty({
        example: ['tag1', 'tag2', 'tag3'],
        description: 'The tags of the group',
    })
    //TODO: duplicated tags validation
    @IsArray()
    @IsString({ each: true })
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(25)
    @Length(1, 512, { each: true })
    GroupTags: string[];
}
