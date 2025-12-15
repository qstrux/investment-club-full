import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 全局前缀
  const apiPrefix = configService.get('API_PREFIX') || '/api';
  app.setGlobalPrefix(apiPrefix);

  // 全局验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动删除非白名单属性
      forbidNonWhitelisted: true, // 如果有非白名单属性则抛出错误
      transform: true, // 自动转换类型
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS配置
  const corsOrigin = configService.get('CORS_ORIGIN') || 'http://localhost:3000';
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // Swagger API文档
  const config = new DocumentBuilder()
    .setTitle('三层漏斗CRM系统 API')
    .setDescription('CRM系统后端API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', '认证相关')
    .addTag('customers', '客户管理')
    .addTag('employees', '员工管理')
    .addTag('funnel', '漏斗数据')
    .addTag('scripts', '话术库')
    .addTag('materials', '素材库')
    .addTag('reports', '报表统计')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // 启动服务
  const port = configService.get('PORT') || 4000;
  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║   🚀 三层漏斗CRM系统 - 后端服务已启动                ║
  ║                                                       ║
  ║   📍 服务地址: http://localhost:${port}${apiPrefix}              ║
  ║   📚 API文档: http://localhost:${port}/api-docs       ║
  ║   🌍 环境: ${configService.get('NODE_ENV')}                    ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
}

bootstrap();
