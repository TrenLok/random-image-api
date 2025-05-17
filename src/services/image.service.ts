import { readdirSync, existsSync } from 'node:fs';

import { config } from '../config';
import { shuffleArray } from '../utils';

class ImageService {
  private readonly imageDir: string;
  private imageList: string[] = [];
  private currentIndex = 0;

  constructor() {
    this.imageDir = config.imageDir;
    this.validateDirectory();
    this.loadImages();
  }

  private validateDirectory() {
    if (!existsSync(this.imageDir)) {
      throw new Error(`⛔ Directory not found: ${this.imageDir}`);
    }
  }

  private getImages() {
    return readdirSync(this.imageDir).filter((file) =>
      /\.(jpe?g|png|gif)$/i.test(file));
  }

  private loadImages() {
    try {
      const files = this.getImages();

      if (files.length === 0) {
        console.warn(`⛔ No images found in directory: ${this.imageDir}`);
      }

      this.imageList = shuffleArray(files);
      this.currentIndex = 0;
      console.log(`✅ Loaded ${this.imageList.length} images from ${this.imageDir}`);
    } catch (error) {
      console.error('⛔ Error loading images:', error);
      this.imageList = [];
    }
  }

  private reloadImages() {
    this.validateDirectory();
    const all = this.getImages();
    if (all.length !== this.imageList.length || all.some((f) => !this.imageList.includes(f))) {
      console.log('🔄 Files changed, reloading images');
      this.loadImages();
      this.currentIndex = 0;
    }
  }

  getNextImage() {
    if (this.imageList.length === 0) return null;

    this.reloadImages();

    const image = this.imageList[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.imageList.length;
    return image;
  }

  imageExists(filename: string) {
    return this.imageList.includes(filename);
  }
}

export const imageService = new ImageService();
