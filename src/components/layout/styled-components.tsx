/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { NavLink } from 'react-router';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100%;
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
`;

export const Content = styled.main`
  width: 100%;
`;
