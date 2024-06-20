import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { randomBytes } from 'crypto';
import { ConfigSchema } from 'src/utils/config-validation.schema';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

const EVERY_15_DAYS_AT_MIDNIGHT = '0 0 */15 * *';
const EVERY_SECOND_MONTH_AT_MIDNIGHT = '0 0 1 */2 *';
@Injectable()
export class ScheduledTasksService {
    constructor(
        private readonly configService: ConfigService<ConfigSchema>,
        private readonly usersService: UsersService,
        private readonly prismaService: PrismaService,
    ) {}
    private logger = new Logger(ScheduledTasksService.name);

    // @Cron(CronExpression.EVERY_SECOND)
    // async handleCron() {
    //     this.logger.debug('Called when the second is 0');
    //     const test = await this.usersService.clearUsersRefreshTokens();
    //     this.logger.debug(test);
    // }

    // TODO: not working
    @Cron(EVERY_SECOND_MONTH_AT_MIDNIGHT)
    async reshuffleRefreshTokenSecrets() {
        this.logger.debug('Reshuffling refresh token secrets');

        const newSecret = randomBytes(64).toString('hex');
        this.logger.debug(`New secret: ${newSecret}`);

        process.env.REFRESH_TOKEN_SECRET = newSecret;

        // remove all refresh tokens from db
        this.logger.debug('Removing all refresh tokens from db');
        await this.usersService.clearUsersRefreshTokens();

        this.logger.debug('Refresh token secrets reshuffled');
        this.logger.debug(process.env.REFRESH_TOKEN_SECRET);

        // this works as a restart to the server because we specify in docker compose to restart server
        process.exit(0);
    }

    @Cron(EVERY_15_DAYS_AT_MIDNIGHT)
    async reshuffleAccessTokenSecrets() {
        this.logger.debug('Reshuffling access token secrets');

        const newSecret = randomBytes(64).toString('hex');
        this.logger.debug(`New secret: ${newSecret}`);

        process.env.ACCESS_TOKEN_SECRET = newSecret;

        this.logger.debug('Access token secrets reshuffled');
        this.logger.debug(process.env.ACCESS_TOKEN_SECRET);

        // this works as a restart to the server because we specify in docker compose to restart server
        process.exit(0);
    }
}
