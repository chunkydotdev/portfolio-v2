import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Breakpoints } from '../../styles/breakpoints'
import { Colors } from '../../styles/colors'
import { Spacings } from '../../styles/spacings'

const MobileExpandButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background: transparent;
  border: 0;
  z-index: 100;
  display: block;
  position: relative;
  margin-right: ${Spacings.lg};

  ${Breakpoints.minMedia.tablet} {
    display: none;
  }

  &.expanded {
    &:after {
      transform: rotateZ(-45deg);
      background-color: ${Colors.secondary};
    }
    &:before {
      transform: translate(7px, -10px) rotateZ(45deg) scaleX(2);
      background-color: ${Colors.secondary};
    }
  }

  &:after {
    content: '';
    width: 20px;
    height: 4px;
    background: white;
    position: absolute;
    top: 17px;
    left: 14px;
    transform-origin: right top;
    transition: transform 0.15s;
  }

  &:before {
    content: '';
    width: 10px;
    height: 4px;
    background: white;
    position: absolute;
    top: 27px;
    left: 16px;
    transform-origin: left top;
    transition: transform 0.15s;
  }
`

const Sider = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  width: auto;
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  transition: all 0.25s;
  ${({ show }) =>
    show ? 'transform: translateY(0);' : 'transform: translateY(100vh);'}
  border-top: 2px solid white;
  flex-shrink: 0;

  ${Breakpoints.minMedia.tablet} {
    border-top: 0;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 100px;
    position: relative;
    width: 300px;
    max-height: 800px;
    transform: translateY(0) !important;
    background-color: transparent;
    display: none;
  }

  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
`

const Menu = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 200px;
  padding: 0;
  ${Breakpoints.minMedia.tablet} {
    align-items: flex-start;
    width: 200px;
    padding-inline-start: 40px;
  }
`

const MenuItem = styled.li`
  margin-bottom: ${Spacings.md};
  padding-top: ${Spacings.lg};
  ${Breakpoints.minMedia.tablet} {
    padding-top: 0;
    margin-bottom: ${Spacings.xl};
  }
  &:last-of-type {
    margin-bottom: 0;
  }
`

const StyledLink = styled.a<{ active?: boolean }>`
  text-decoration: none;
  font-weight: 600;
  font-size: 28px;
  font-family: 'Londrina Solid';
  cursor: pointer;
  color: ${Colors.secondary};
`

const SideMenu = () => {
  const [showMenu, setShowMenu] = useState(false)

  const routes = [
    { name: 'Up Top', route: '#up-top' },
    { name: 'Projects', route: '#projects' },
    { name: 'About', route: '#about' },
    { name: 'Contact Me', route: '#contact' }
  ]

  return (
    <>
      <MobileExpandButton
        className={showMenu ? 'expanded' : ''}
        onClick={() => setShowMenu(!showMenu)}
      />
      <Sider show={showMenu}>
        <Menu>
          {routes.map(({ name, route }, index) => (
            <MenuItem key={index}>
              <Link href={route} passHref>
                <StyledLink onClick={() => setShowMenu(false)}>{name}</StyledLink>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Sider>
    </>
  )
}

export default SideMenu
