
import React from 'react';
import styled from 'styled-components';
import CardAccount from '../Card/CardAccount.jsx';
import { FaHome, FaUser, FaSignOutAlt, FaNewspaper, FaPlus } from 'react-icons/fa';

// Reusable navigation button
const ButtonNav = ({ href, icon, children, active, as, ...props }) => {
  const Comp = as || 'a';
  return (
    <NavButton as={Comp} href={href} $active={active ? 1 : 0} {...props}>
      <span className="icon">{icon}</span>
      <span>{children}</span>
    </NavButton>
  );
};

const NavbarJurnalis = () => {
  // Determine active path for highlight
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  return (
    <NavbarContainer>
      <Section>
        <CardAccount />
        <NavList>
          <ButtonNav
            href="/employee"
            icon={<FaHome />}
            active={path === '/employee'}
          >Dashboard</ButtonNav>
          <ButtonNav
            href="/employee/news"
            icon={<FaNewspaper />}
            active={path.startsWith('/employee/news')}
          >News</ButtonNav>
          <ButtonNav
            href="/employee/create-news"
            icon={<FaPlus />}
            active={path.startsWith('/employee/create-news')}
          >Create News</ButtonNav>
          <ButtonNav
            href="/employee/profile"
            icon={<FaUser />}
            active={path.startsWith('/employee/profile')}
          >Profile</ButtonNav>
        </NavList>
      </Section>
      <Section>
        <NavList>
          <ButtonNav href="/" icon={<FaHome />}>Back to Home</ButtonNav>
          <form method="POST" action="/logout" style={{ display: 'inline' }}>
            <ButtonNav
              as="button"
              type="submit"
              icon={<FaSignOutAlt />}
              style={{ width: '100%' }}
            >Log Out</ButtonNav>
          </form>
        </NavList>
      </Section>
    </NavbarContainer>
  );
};

// Styled-components for styling
const NavbarContainer = styled.nav`
  width: 260px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 2px 0 8px 0 rgba(0,0,0,0.03);
  padding: 0 0 24px 0;
`;

const Section = styled.section`
  padding: 24px 0 0 0;
`;

const NavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

const NavButton = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  font-size: 1rem;
  color: ${({ $active }) => ($active ? '#2563eb' : '#374151')};
  background: ${({ $active }) => ($active ? 'rgba(37,99,235,0.08)' : 'transparent')};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.15s, color 0.15s;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    background: #e0e7ff;
    color: #1d4ed8;
  }
  & .icon {
    font-size: 1.2em;
    display: flex;
    align-items: center;
  }
`;

export default NavbarJurnalis;