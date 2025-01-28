import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import { PrismaService } from './prisma.service';
import { ValidationService } from './validation.service';

@Module({
    imports: [
        WinstonModule.forRoot({
            level: 'debug',
            format: winston.format.json(),
            transports: [new winston.transports.Console()]
        }),
        ConfigModule.forRoot({
            isGlobal: true
        })
    ],
    providers: [PrismaService, ValidationService],
    exports: [PrismaService, ValidationService]
})
export class CommonModule {}
