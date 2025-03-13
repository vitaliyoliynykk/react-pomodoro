/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { NavLink } from 'react-router';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const Sidebar = styled.aside`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
`;

export const StyledNavLink = styled(NavLink)`
  padding: 4px;
  border-radius: 4px;
  margin-bottom: 8px;
  display: block;

  &.active {
    background-color: cadetblue;
  }

  @media (max-width: 768px) {
    margin-bottom: unset;
  }
`;

export const Content = styled.main`
  width: 100%;

  @media (max-width: 768px) {
    height: 100%;
  }
`;

export const NavigationMenu = styled.ul`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    gap: 16px;
  }
`;
