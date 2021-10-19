import { router as renderRouter } from './render.js';
import { router as userRouter } from './users.js';
import { router as productRouter } from './products.js';
import { router as groupMemberRouter } from './group-members.js';

import { registerStaticRoutes } from './static.js';

export async function registerRoutes(app) {
    app.use(renderRouter);
    app.use('/api/users', userRouter);
    app.use('/api/products', productRouter);
    app.use('/api/group-members', groupMemberRouter);

    registerStaticRoutes(app);
}





