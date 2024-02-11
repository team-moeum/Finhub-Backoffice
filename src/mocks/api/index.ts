import { authHandler } from './auth';
import { categoryHandler } from './category';

const apiHandlers = [...authHandler, ...categoryHandler];

export default apiHandlers;
