import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../../styles/breakpoints";
import { Spacings } from "../../styles/spacings";
import { socialMedia } from "../../utils/social-media";
import { introTime } from "../cta";
import { Spacer, StyledLink } from "../shared";
import SideMenu from "./side-menu";

const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  width: 100%;
  position: fixed;
  z-index: 5;
  background: linear-gradient(#00000040, transparent);
`;

const Logo = styled.img`
  margin-left: ${Spacings.lg};
  ${Breakpoints.minMedia.tablet} {
    margin-left: 0;
    margin-right: 101px;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
  width: 100%;

  ${Breakpoints.minMedia.tablet} {
    max-width: ${Breakpoints.size.tablet};
    padding: 0 ${Spacings.lg};
  }

  ${Breakpoints.minMedia.desktop} {
    max-width: ${Breakpoints.size.desktop};
    padding: 0 ${Spacings.lg};
  }
`;

const CenterContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0;
  transform: translateY(-20px);
  ${Breakpoints.minMedia.tablet} {
    display: flex;
  }

  animation: loading-content 0.2s ${introTime + 1}s linear forwards;

  @keyframes loading-content {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SocialMedia = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Filler = styled.div`
  ${Breakpoints.minMedia.tablet} {
    display: none;
  }
`;

export const Header = () => {
  const pages = [
    { name: "Up top", url: "#up-top" },
    { name: "Projects", url: "#projects" },
    { name: "Blog", url: "https://chunky.dev/" },
    { name: "Contact", url: "#contact" },
  ];
  return (
    <Container>
      <Content>
        <Link href="#up-top" passHref>
          <a>
            <Logo src="/logo.svg" />
          </a>
        </Link>
        <CenterContainer>
          {pages.map(({ name, url }) => (
            <React.Fragment key={"route-" + name}>
              <Link href={url} passHref>
                <StyledLink skipUnderline>{name}</StyledLink>
              </Link>
              <Spacer direction="horizontal" />
            </React.Fragment>
          ))}
        </CenterContainer>
        <SocialMedia>
          <a
            href={socialMedia.twitter.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandTwitter size="36px" />
          </a>
          <Spacer direction="horizontal" />
          <a
            href={socialMedia.linkedin.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin size="36px" />
          </a>
          <Spacer direction="horizontal" />
          <a
            href={socialMedia.youtube.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandYoutube size="36px" />
          </a>
          <Spacer direction="horizontal" />
          <a
            href={socialMedia.github.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub size="36px" />
          </a>
        </SocialMedia>
        <SideMenu />
      </Content>
    </Container>
  );
};
