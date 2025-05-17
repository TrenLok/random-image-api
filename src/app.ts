import { createApp } from 'h3';

import { setupRoutes } from './routes';

const app = createApp();
const router = setupRoutes();

app.use(router);

export default app;
export const handler = app.handler;
