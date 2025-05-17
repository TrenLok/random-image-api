import path from 'node:path';

import dotenv from 'dotenv';

dotenv.config();

export const config = {
  imageDir: process.env.IMAGE_DIR
    ? path.resolve(process.env.IMAGE_DIR)
    : path.join(process.cwd(), 'images'),
};
