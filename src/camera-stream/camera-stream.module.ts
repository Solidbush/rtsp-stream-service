import { Module } from '@nestjs/common';
import { CameraStreamService } from './camera-stream.service';
import { CameraStreamController } from './camera-stream.controller';

@Module({
  providers: [CameraStreamService],
  controllers: [CameraStreamController]
})
export class CameraStreamModule {}
