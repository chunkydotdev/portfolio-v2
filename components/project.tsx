import { IconBrandGithub, IconLink } from '@tabler/icons'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Breakpoints } from '../styles/breakpoints'
import { Colors } from '../styles/colors'
import { Spacings } from '../styles/spacings'
import { Spacer, StyledLink, StyledTitle } from './shared'

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Content = styled.div`
  position: relative;
  flex-direction: column;
  align-items: center;
  max-width: ${Breakpoints.size.largeDesktop};
`

const ProjectImage = styled.div<{ src: string }>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  width: 300px;
  height: 200px;
  transform: rotate(-25deg) translateX(-20vw);
  opacity: 0;
  transition: 0.5s all;
  &:hover {
    position: relative;
    z-index: 2;
  }

  &.show {
    transform: translateX(0);
    opacity: 1;
  }

  ${Breakpoints.minMedia.tablet} {
    width: 400px;
    height: 300px;
  }

  ${Breakpoints.minMedia.desktop} {
    width: 600px;
    height: 400px;
  }
`

const Description = styled.div`
  background-color: ${Colors.primary};
  padding: ${Spacings.md};
  max-width: 300px;
  color: #555;
  transform: translateX(-100vh);
  transition: 0.5s all;

  &.show {
    transform: translateX(0);
  }

  ${Breakpoints.minMedia.tablet} {
    position: absolute;
    top: 40%;
    left: -100px;
  }
`

const StackContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;

  ${Breakpoints.minMedia.tablet} {
    width: 50%;
  }
`

const Stack = styled.div`
  background-color: #fff;
  color: ${Colors.secondary};
  border-radius: 10px;
  min-width: 30px;
  text-align: center;
  margin: ${Spacings.xs};
  padding: ${Spacings.xs} ${Spacings.sm};
  white-space: nowrap;
`

const Links = styled.div`
  position: absolute;
  top: ${Spacings.sm};
  right: ${Spacings.sm};
  display: flex;
`

const AnimatedTitle = styled(StyledTitle)`
  transform: translateX(-100vh);
  transition: 0.5s all;

  &.show {
    transform: translateX(0);
  }
`

type Props = {
  image: string
  title: string
  description: string
  stack: string[]
  url: string
  github?: string
}

type Tech = 'react' | 'nextjs' | 'sqlite'

const Project = ({ image, title, description, stack, url, github }: Props) => {
  const { inView, ref } = useInView({ threshold: 0.2 })

  return (
    <Container ref={ref}>
      <Content>
        <AnimatedTitle className={inView ? 'show' : ''} level={2}>
          {title}
        </AnimatedTitle>
        <Links>
          <StyledLink href={url} target='_blank' rel='noopener noreferrer'>
            <IconLink />
          </StyledLink>
          {github && (
            <>
              <Spacer direction='horizontal' />
              <StyledLink>
                <IconBrandGithub />
              </StyledLink>
            </>
          )}
        </Links>
        <Spacer />
        <ProjectImage className={inView ? 'show' : ''} src={image} />
        <Description className={inView ? 'show' : ''}>
          {description}
        </Description>
        <StackContainer>
          {stack.map(tech => (
            <Stack key={tech}>{tech}</Stack>
          ))}
        </StackContainer>
      </Content>
    </Container>
  )
}

export default Project
