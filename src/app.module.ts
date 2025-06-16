import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CameraStreamModule } from './camera-stream/camera-stream.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'streams'), // тут будут папки с .m3u8
      serveRoot: '/streams',
    }),
    CameraStreamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
