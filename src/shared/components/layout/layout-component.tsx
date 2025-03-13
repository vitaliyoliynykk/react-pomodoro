import { Icon } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { IoSettingsSharp } from 'react-icons/io5';
import { Outlet } from 'react-router';

import {
  Content,
  LayoutContainer,
  NavigationMenu,
  Sidebar,
  StyledNavLink,
} from './styled-components';

const Layout = () => {
  const navigation = [
    { link: '/', icon: <FaHome /> },
    { link: '/settings', icon: <IoSettingsSharp /> },
  ];

  const getNavigationMenu = () => {
    return navigation.map((item) => (
      <li key={item.link}>
        <StyledNavLink to={item.link}>
          <Icon fontSize="2xl" color="white.700">
            {item.icon}
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
