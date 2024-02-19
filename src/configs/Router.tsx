import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { UserTypeListPage } from '../pages/UserTypePage';
import { UserTypeCreatePage } from '../pages/UserTypePage/Create';
import { UserTypeDetailPage } from '../pages/UserTypePage/Detail';
import { TopicDetailPage } from '../pages/TopicPage/Detail';
import { TopicCreatePage } from '../pages/TopicPage/Create';
import { TopicListPage } from '../pages/TopicPage';
import { CategoryListPage } from '../pages/CategoryPage';
import { CategoryCreatePage } from '../pages/CategoryPage/Create';
import { CategoryDetailPage } from '../pages/CategoryPage/Detail';
import { ErrorPage } from '../pages/ErrorPage';
import { LogListPage } from '../pages/LogPage';

export const FHPath: { [key: string]: { label: string; link: string } } = {
  dashboard: { label: '대시보드', link: '/' },
  categories: { label: '카테고리', link: '/services/categories' },
  categoriesCreate: {
    label: '카테고리 생성',
    link: '/services/categories/create',
  },
  categoriesDetail: {
    label: '카테고리 상세',
    link: '/services/categories/:id',
  },
  topics: { label: '주제', link: '/services/topics' },
  topicsCreate: { label: '주제 생성', link: '/services/topics/create' },
  topicsDetail: { label: '주제 상세', link: '/services/topics/:id' },
  usertypes: { label: '유저유형', link: '/services/usertypes' },
  usertypesCreate: {
    label: '유저유형 생성',
    link: '/services/usertypes/create',
  },
  usertypesDetail: { label: '유저유형 상세', link: '/services/usertypes/:id' },
  logs: { label: 'GPT 로그', link: '/services/logs' },
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={FHPath.dashboard.link} element={<DashboardPage />} />
        <Route path={FHPath.usertypes.link} element={<UserTypeListPage />} />
        <Route
          path={FHPath.usertypesCreate.link}
          element={<UserTypeCreatePage />}
        />
        <Route
          path={FHPath.usertypesDetail.link}
          element={<UserTypeDetailPage />}
        />
        <Route path={FHPath.categories.link} element={<CategoryListPage />} />
        <Route
          path={FHPath.categoriesCreate.link}
          element={<CategoryCreatePage />}
        />
        <Route
          path={FHPath.categoriesDetail.link}
          element={<CategoryDetailPage />}
        />
        <Route path={FHPath.topics.link} element={<TopicListPage />} />
        <Route path={FHPath.topicsCreate.link} element={<TopicCreatePage />} />
        <Route path={FHPath.topicsDetail.link} element={<TopicDetailPage />} />
        <Route path={FHPath.logs.link} element={<LogListPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
