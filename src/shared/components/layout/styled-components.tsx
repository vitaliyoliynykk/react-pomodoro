/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { NavLink } from 'react-router';

export const LayoutContainer = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 768px) {
    width: 100%;
    position: fixed;
    flex-direction: column-reverse;
  }
`;

export const Sidebar = styled.aside(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  padding: `${theme.spacing.sm} ${theme.spacing.md} ${theme.spacing.lg}`,
}));

export const StyledNavLink = styled(NavLink)(({ theme }) => ({
  padding: theme.spacing.xxs,
  borderRadius: theme.radius.small,
  marginBottom: theme.spacing.sm,
  display: 'block',
  '&.active': {
    backgroundColor: 'cadetblue',
  },
  '&:hover': {
    backgroundColor: 'cadetblue',
  },
  '@media (max-width: 768px)': {
    marginBottom: 'unset',
  },
}));

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
    gap: ${({ theme }) => theme.spacing.md};
  }
`;
