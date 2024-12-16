import { authHandler } from './auth';
import { categoryHandler } from './category';
import { topicHandler } from './topic';
import { usertypeHandler } from './userType';

const apiHandlers = [
  ...authHandler,
  ...categoryHandler,
  ...topicHandler,
  ...usertypeHandler,
];

export default apiHandlers;
