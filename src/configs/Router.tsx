import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DashboardPage } from '@finhub/pages/DashboardPage';
import { UserTypeListPage } from '@finhub/pages/UserTypePage';
import { UserTypeCreatePage } from '@finhub/pages/UserTypePage/Create';
import { UserTypeDetailPage } from '@finhub/pages/UserTypePage/Detail';
import { TopicDetailPage } from '@finhub/pages/TopicPage/Detail';
import { TopicCreatePage } from '@finhub/pages/TopicPage/Create';
import { TopicListPage } from '@finhub/pages/TopicPage';
import { CategoryListPage } from '@finhub/pages/CategoryPage';
import { CategoryCreatePage } from '@finhub/pages/CategoryPage/Create';
import { CategoryDetailPage } from '@finhub/pages/CategoryPage/Detail';
import { ErrorPage } from '@finhub/pages/ErrorPage';
import { LogListPage } from '@finhub/pages/LogPage';
import { NoWordListPage } from '@finhub/pages/NoWordPage';
import { QuizListPage } from '@finhub/pages/QuizPage';
import { AvatarListPage } from '@finhub/pages/AvatarPage';
import { AnnounceListPage } from '@finhub/pages/AnnouncePage';
import { AnnounceCreatePage } from '@finhub/pages/AnnouncePage/Create';
import { AnnounceDetailPage } from '@finhub/pages/AnnouncePage/Detail';
import { BannerListPage } from '@finhub/pages/BannerPage';
import { BannerCreatePage } from '@finhub/pages/BannerPage/Create';
import { BannerDetailPage } from '@finhub/pages/BannerPage/Detail';
import { ColumnListPage } from '@finhub/pages/ColumnPage';
import { ColumnCreatePage } from '@finhub/pages/ColumnPage/Create';
import { ColumnDetailPage } from '@finhub/pages/ColumnPage/Detail';
import { ColumnCommentReportPage } from '@finhub/pages/ColumnPage/CommentReportPage';

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
  noWords: { label: '단어 요청', link: '/services/noWords' },
  quizzes: { label: '퀴즈', link: '/services/quizzes' },
  avatars: { label: '아바타', link: '/services/avatars' },
  announces: { label: '공지사항', link: '/services/announces' },
  announceCreate: {
    label: '공지사항 생성',
    link: '/services/announces/create',
  },
  announceDetail: { label: '공지사항 상세', link: '/services/announces/:id' },
  banners: { label: '배너', link: '/services/banners' },
  bannerCreate: {
    label: '배너 생성',
    link: '/services/banners/create',
  },
  bannerDetail: { label: '배너 상세', link: '/services/banners/:id' },
  columns: { label: 'GPT 컬럼', link: '/services/columns' },
  columnCreate: { label: 'GPT 컬럼 생성', link: '/services/columns/create' },
  columnDetail: { label: 'GPT 컬럼 상세', link: '/services/columns/:id' },
  columnCommentReport: {
    label: 'GPT 컬럼 신고 댓글',
    link: '/services/columns/:id/comment/report',
  },
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
        <Route path={FHPath.noWords.link} element={<NoWordListPage />} />
        <Route path={FHPath.quizzes.link} element={<QuizListPage />} />
        <Route path={FHPath.avatars.link} element={<AvatarListPage />} />
        <Route path={FHPath.announces.link} element={<AnnounceListPage />} />
        <Route
          path={FHPath.announceCreate.link}
          element={<AnnounceCreatePage />}
        />
        <Route
          path={FHPath.announceDetail.link}
          element={<AnnounceDetailPage />}
        />
        <Route path={FHPath.banners.link} element={<BannerListPage />} />
        <Route path={FHPath.bannerCreate.link} element={<BannerCreatePage />} />
        <Route path={FHPath.bannerDetail.link} element={<BannerDetailPage />} />
        <Route path={FHPath.columns.link} element={<ColumnListPage />} />
        <Route path={FHPath.columnCreate.link} element={<ColumnCreatePage />} />
        <Route path={FHPath.columnDetail.link} element={<ColumnDetailPage />} />
        <Route
          path={FHPath.columnCommentReport.link}
          element={<ColumnCommentReportPage />}
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
