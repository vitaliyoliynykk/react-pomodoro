import { Icon } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { FaHome } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';

import { ACCESS_TOKEN_KEY } from '@/shared/constants/tokens';
import { useAuth } from '@/shared/context/auth-context';
import { getUser, logOut } from '@/store/slices/user-slice';
import { AppDispatch, RootState } from '@/store/store';

import {
  Content,
  LayoutContainer,
  NavigationMenu,
  Sidebar,
  StyledNavLink,
} from './styled-components';

const _navigation = [
  { link: '/', icon: <FaHome /> },
  { link: '/settings', icon: <IoSettingsSharp />, isProtected: true },
  { link: '/sign-out', icon: <IoMdLogOut />, isProtected: true },
];

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user: authUser, setUser } = useAuth();
  const { user, status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (authUser && !user && status !== 'loading') {
      void dispatch(getUser());
    }
  }, [authUser, dispatch, user, status]);

  const navigation = useMemo(() => {
    if (!user) {
      return _navigation.filter((item) => !item.isProtected);
    }

    return _navigation;
  }, [user]);

  const handleLogOut = () => {
    try {
      if (setUser) {
        setUser(null);
      }
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      void dispatch(logOut());
    } catch {
      console.log('Error loggin out');
    }
  };

  const getNavigationMenu = () => {
    const handleLinkClick = (link: string) => {
      if (link === '/sign-out') {
        handleLogOut();
      }
    };

    return navigation.map(({ link, icon }) => (
      <li key={link}>
        <StyledNavLink
          to={link}
          onClick={() => {
            handleLinkClick(link);
          }}
        >
          <Icon fontSize="2xl" color="white.700">
            {icon}
          </Icon>
        </StyledNavLink>
      </li>
    ));
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <nav>
          <NavigationMenu>{getNavigationMenu()}</NavigationMenu>
        </nav>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </LayoutContainer>
  );
};

export default Layout;
