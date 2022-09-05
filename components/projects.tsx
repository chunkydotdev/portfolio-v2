import React, { createRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Breakpoints } from '../styles/breakpoints'
import { Colors } from '../styles/colors'
import { Spacings } from '../styles/spacings'
import Project from './project'
import { Spacer, StyledLink, StyledTitle } from './shared'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-bottom: ${Spacings.xl};
`

const CTALink = styled(StyledLink)`
  text-decoration: underline !important;
  font-size: 24px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: -20px;
    right: -30px;
    height: 20px;
    width: 20px;
    border: 5px solid white;
    border-right-color: transparent;
    border-top-color: transparent;
    animation: bounce 2s infinite alternate-reverse;

    @keyframes bounce {
      from {
        transform: translate(-5px, 5px);
      }
      to {
        transform: translate(10, -10px);
      }
    }
  }
`

const ProjectsFooter = styled.div`
  width: 100%;
  background-color: ${Colors.secondary}70;
  padding-top: ${Spacings.lg};
  padding-bottom: ${Spacings.md};
  margin-top: ${Spacings.xxl};
`

const Projects = () => {
  const projects = [
    {
      title: 'Heaven.cat',
      description:
        'I built this web application for a blockchain-game called Cryptokitties where you collect and breed kitties. The main purpose of the web application is to help the user find specific cats. The system was built with Elasticsearch, serving as the database for both userdata and cryptocatdata. The cryptocatdata was scraped from the ethereum blockchain using python-scripts. A REST-API built in Dotnet Core v2.1 was built on top of the DB which serves clean and simple models to the frontend, using JSON. The frontend was built with Vue, including typescript, html and scss. ',
      image: '/assets/heavencat.png',
      stack: ['vue', 'scss'],
      url: 'https://heaven.cat'
    },
    {
      title: 'Papero',
      description:
        'A web application me and a friend built to allow users build their PDFs in a webformat and through our service convert those to PDF.',
      image: '/assets/papero.png',
      stack: ['react', 'nextjs', 'styled-components'],
      url: 'https://papero.io'
    },
    {
      title: 'Nounishfish',
      description:
        'A hobby web application I built for a friend who sold NFTs, they just wanted something simple but I kind of let my creation free on this one. A lot of blinking objects and animations, which was super fun to design and build.',
      image: '/assets/nounishfish.png',
      stack: ['react', 'nextjs', 'styled-components', 'web3'],
      url: 'https://nounishfish.com',
      github: 'https://github.com/Storken/nounishfish'
    }
  ]

  return (
    <Container id="projects">
      <Spacer size={Spacings.xxl} />
      <StyledTitle level={1}>Highlighted projects</StyledTitle>
      {projects.map(props => (
        <React.Fragment key={props.title}>
          <Spacer size={Spacings.xxl} />
          <Project key={props.title} {...props} />
        </React.Fragment>
      ))}
      <ProjectsFooter>
        <StyledTitle noMargin level={3}>
          More projects on my <CTALink href='https://chunky.dev/'>blog</CTALink>
        </StyledTitle>
      </ProjectsFooter>
    </Container>
  )
}

export default Projects
