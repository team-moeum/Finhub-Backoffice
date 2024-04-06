import { HttpResponse, http } from 'msw';
import { authHandler } from './auth';
import { categoryHandler } from './category';
import { topicHandler } from './topic';
import { usertypeHandler } from './userType';

const apiHandlers = [
  ...authHandler,
  ...categoryHandler,
  ...topicHandler,
  ...usertypeHandler,
  http.post('/api/upload', () => {
    return HttpResponse.json(
      {
        status: 'SUCCESS',
      },
      { status: 200 },
    );
  }),
];

export default apiHandlers;
