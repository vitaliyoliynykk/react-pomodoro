import { Icon } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { IoMdLogOut } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';
import { Outlet, useNavigate } from 'react-router';

import {
  Content,
  LayoutContainer,
  NavigationMenu,
  Sidebar,
  StyledNavLink,
} from './styled-components';

const Layout = () => {
  const navigate = useNavigate();

  const navigation = [
    { link: '/', icon: <FaHome /> },
    { link: '/settings', icon: <IoSettingsSharp /> },
    { link: '/sign-out', icon: <IoMdLogOut /> },
  ];

  const handleLogOut = () => {
    localStorage.removeItem('user');

    void navigate('/sign-in');
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
