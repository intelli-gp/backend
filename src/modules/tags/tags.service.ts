import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaginationDto } from 'src/common/dto';
@Injectable()
export class TagsService {
    constructor(private readonly prismaService: PrismaService) {}
    async addTagsForEntities(
        entityTags: string[],
        entityName: 'user' | 'group' | 'course' | 'article' | 'ai_output',
        entityId: number,
    ) {
        const tags = entityTags.map((tag) => ({
            tag_name: tag.trim().toLowerCase(),
        }));

        await this.prismaService.tag.createMany({
            data: tags,
            skipDuplicates: true,
        });

        const userTags = tags.map((tag) => ({
            tag_name: tag.tag_name,
            [entityName + '_id']: entityId,
        }));

        await this.prismaService[entityName + '_tag'].createMany({
            data: userTags,
            skipDuplicates: true,
        });
    }

    async updateTagsForEntities(
        addedTags: string[],
        removedTags: string[],
        entityName: 'user' | 'group' | 'course' | 'article' | 'ai_output',
        entityId: number,
    ) {
        if (addedTags?.length > 0)
            await this.addTagsForEntities(addedTags, entityName, entityId);

        if (removedTags?.length > 0)
            await this.prismaService[entityName + '_tag'].deleteMany({
                where: {
                    tag_name: {
                        in: removedTags,
                    },
                    [entityName + '_id']: entityId,
                },
            });

        return true;
    }

    async addTagsToUserSystem(tags: string[], userId: number, prisma: any) {
        const customizedTags = new Map();
        for (const tag of tags)
            customizedTags.set(tag.trim().toLowerCase(), {
                tag_name: tag.trim().toLowerCase(),
                user_id: userId,
            });

        const userTags = await prisma.user_system_tag.findMany({
            where: {
                user_id: userId,
            },
        });

        await prisma.user_system_tag.updateMany({
            where: {
                user_id: userId,
                tag_name: { in: tags },
            },
            data: {
                tag_importance: {
                    increment: 1,
                },
            },
        });

        for (let i = 0; i < userTags.length; i++) {
            if (customizedTags.has(userTags[i].tag_name))
                customizedTags.delete(userTags[i].tag_name);
        }

        const otherTags = Array.from(customizedTags.values());

        await prisma.user_system_tag.createMany({
            data: otherTags,
        });

        return true;
    }

    async getAllTags(paginationData?: PaginationDto) {
        const { limit, offset } = paginationData;
        const tags = await this.prismaService.tag.findMany({
            take: limit,
            skip: offset,
        });
        return tags.map((tag) => tag.tag_name);
    }

    async getSuggestedTags(paginationData?: PaginationDto) {
        const userTags = await this.prismaService.user_tag.findMany({});
        const tagFrequency = userTags.reduce((acc, cur) => {
            if (cur.tag_name in acc) {
                acc[cur.tag_name]++;
            } else {
                acc[cur.tag_name] = 1;
            }
            return acc;
        }, {});
        const tagFrequencyArray = Object.entries(tagFrequency).map(
            ([tag_name, frequency]) => ({ tag_name, frequency }),
        );

        const sortedTagFrequencyArray = tagFrequencyArray.sort(
            (a, b) => Number(a.frequency) - Number(b.frequency),
        );

        const firstNtags = sortedTagFrequencyArray
            .slice(0, paginationData.limit)
            .map((tag) => tag.tag_name);

        return firstNtags;
    }
}
