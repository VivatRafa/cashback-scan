import { LoggingInterceptor } from './utils/interceptor/interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // TODO app.useGlobalInterceptors(new LoggingInterceptor()); Сделать интерцептор, пока что пишет before after для каждого запроса
    await app.listen(3000);
}
bootstrap();
