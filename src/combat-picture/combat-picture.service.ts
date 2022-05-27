import { Injectable } from '@nestjs/common';
import * as faceapi from 'face-api.js';
import * as path from 'path';
import { Canvas, createCanvas, Image, loadImage } from 'canvas';
import { Readable } from 'stream';

@Injectable()
export class CombatPictureService {
  private drawBubble(canvas: Canvas, landmarks: faceapi.FaceLandmarks68[]) {
    const ctx = canvas.getContext('2d');

    const firstFaceLandmarks = landmarks[0];
    const mouthPoint = firstFaceLandmarks.positions[54];

    ctx.fillStyle = '#eeeeee';

    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height / 3);
    ctx.lineTo(mouthPoint.x, mouthPoint.y);
    ctx.lineTo(canvas.width, (canvas.height / 3) * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(
      canvas.width,
      canvas.height / 2,
      canvas.width / 4,
      canvas.height / 1.5,
      Math.PI,
      0,
      2 * Math.PI,
    );

    ctx.fill();

    return canvas;
  }

  private drawImage(canvas: Canvas, image: Image) {
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, 0, 0);

    return canvas;
  }

  async getFacesFromUrl(url: string): Promise<Readable> {
    const img = await loadImage(url);
    const canvas = createCanvas(img.width, img.height);

    const resultLandmarks = await faceapi.detectLandmarks(
      img as unknown as faceapi.TNetInput,
    );

    const landmarks = Array.isArray(resultLandmarks)
      ? resultLandmarks
      : [resultLandmarks];

    const resultCanvas = this.drawBubble(
      this.drawImage(canvas, img),
      landmarks,
    );

    return resultCanvas.createJPEGStream();
  }
}
