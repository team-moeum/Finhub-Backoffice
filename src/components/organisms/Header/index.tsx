import { authAPI } from '@finhub/api/auth';
import { FHPath } from '@finhub/configs/Router';
import * as S from './Header.style';

export const FHHeaderItem = ({
  route,
}: {
  route: {
    link: string;
    label: string;
  };
}) => {
  const isActive =
    route.link === '/'
      ? location.pathname === route.link
      : location.pathname.includes(route.link);
  return (
    <a href={route.link}>
      {isActive ? (
        <S.headerActiveItemWrapper>{route.label}</S.headerActiveItemWrapper>
      ) : (
        <S.headerItemWrapper>{route.label}</S.headerItemWrapper>
      )}
    </a>
  );
};

export const FHHeader = () => {
  const handleSignOut = () => {
    if (window.confirm('로그아웃하시겠습니까?')) {
      authAPI.logout();
      location.reload();
    }
  };

  return (
    <S.headerWrapper>
      <S.headerInnerWrapper>
        <a href="/">
          <S.logo>
            <img width={40} height={40} alt="logo" src="/logo.png" />
            <div>관리자</div>
          </S.logo>
        </a>
        <S.headerItemListWrapper>
          <FHHeaderItem route={FHPath.dashboard} />
          <FHHeaderItem route={FHPath.categories} />
          <FHHeaderItem route={FHPath.topics} />
          <FHHeaderItem route={FHPath.usertypes} />
          <FHHeaderItem route={FHPath.logs} />
          <FHHeaderItem route={FHPath.noWords} />
          <FHHeaderItem route={FHPath.quizzes} />
          <FHHeaderItem route={FHPath.avatars} />
          <S.headerItemWrapper onClick={handleSignOut}>
            로그아웃
          </S.headerItemWrapper>
        </S.headerItemListWrapper>
      </S.headerInnerWrapper>
    </S.headerWrapper>
  );
};
