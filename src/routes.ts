import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  createRouter, defineEventHandler, createError, getRequestURL,
} from 'h3';

import { config } from './config';
import { imageService } from './services';

export function setupRoutes() {
  const router = createRouter();

  router.get('/', defineEventHandler((event) => {
    const imageName = imageService.getNextImage();

    if (!imageName) {
      throw createError({
        statusCode: 404,
        statusMessage: 'No images available',
      });
    }

    return {
      url: `${getRequestURL(event).origin}/image/${encodeURIComponent(imageName)}`,
    };
  }));

  router.get('/image/:filename', defineEventHandler(async (event) => {
    const filename = decodeURIComponent(event.context.params?.filename ?? '');

    if (!imageService.imageExists(filename)) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Image not found',
      });
    }

    try {
      return await readFile(path.join(config.imageDir, filename));
    } catch {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error reading image file',
      });
    }
  }));

  return router;
}
