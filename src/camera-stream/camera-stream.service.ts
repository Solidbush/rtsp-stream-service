import { Injectable, OnModuleInit } from '@nestjs/common';
import { spawn } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CameraStreamService implements OnModuleInit {
    private cameras = [
        {
            name: 'cam1',
            url: 'rtsp://user:pass@camera-ip/stream1',
        },
    ];

    onModuleInit() {
        try {
            this.cameras.forEach((camera) => this.startStream(camera));
        } catch (error) {
            console.error(error);
        }
    }

    private startStream(camera: { name: string; url: string }) {
        const outputDir = path.join(__dirname, '..', '..', 'streams', camera.name);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const ffmpeg = spawn('ffmpeg', [
            '-i', camera.url,
            '-c:v', 'libx264',
            '-preset', 'veryfast',
            '-f', 'hls',
            '-hls_time', '2',
            '-hls_list_size', '3',
            '-hls_flags', 'delete_segments',
            `${outputDir}/index.m3u8`,
        ]);

        ffmpeg.stderr.on('data', (data) => {
            console.error(`FFmpeg stderr [${camera.name}]: ${data}`);
        });

        ffmpeg.on('close', (code) => {
            console.log(`FFmpeg process for ${camera.name} exited with code ${code}`);
        });
    }
}
