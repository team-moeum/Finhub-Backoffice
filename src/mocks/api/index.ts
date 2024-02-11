import { authHandler } from './auth';
import { categoryHandler } from './category';
import { topicHandler } from './topic';

const apiHandlers = [...authHandler, ...categoryHandler, ...topicHandler];

export default apiHandlers;
