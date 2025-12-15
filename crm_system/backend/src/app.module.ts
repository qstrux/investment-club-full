import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomersModule } from './modules/customers/customers.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { FunnelModule } from './modules/funnel/funnel.module';
import { ScriptsModule } from './modules/scripts/scripts.module';
import { MaterialsModule } from './modules/materials/materials.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
    imports: [
        // 配置模块
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // 限流模块
        ThrottlerModule.forRoot([
            {
                ttl: 60000, // 60秒
                limit: 100, // 最多100个请求
            },
        ]),

        // 数据库模块
        PrismaModule,

        // 业务模块
        AuthModule,
        CustomersModule,
        EmployeesModule,
        FunnelModule,
        ScriptsModule,
        MaterialsModule,
        ReportsModule,
    ],
})
export class AppModule { }
