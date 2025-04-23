import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
    const title = process.env.PROJECT_NAME ?? "API"
    const config = new DocumentBuilder()
        .setTitle(title)
        .setDescription('Auto-generated API docs with Swagger')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger_ui', app, document);
}