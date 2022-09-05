import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { StyledLink, StyledParagraph, StyledTitle } from '../components/shared'
import { Breakpoints } from '../styles/breakpoints'
import { Colors } from '../styles/colors'
import { Spacings } from '../styles/spacings'

export const introTime = 1

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: ${Breakpoints.size.largeDesktop};
  position: relative;

  animation: loading-container ${introTime / 20}s ease;
  animation-iteration-count: 25;

  @keyframes loading-container {
    from {
      transform: translateX(-20px);
    }
    to {
      transform: translateX(0);
    }
  }
`

const ProfilePic = styled.img`
  position: absolute;
  bottom: 0;
  right: -50px;
  transition: all 0.2s;
  opacity: 0;
  width: 100%;
  height: auto;

  ${Breakpoints.minMedia.tablet} {
    width: 60%;
    left: 50%;
  }

  ${Breakpoints.minMedia.largeDesktop} {
    height: 90vh;
    width: auto;
  }

  &.animate {
    animation: profile ${introTime}s linear forwards;
  }

  &.show {
    opacity: 1;
  }

  &.hide {
    transform: rotateZ(10deg) translateX(20vh);
  }

  @keyframes profile {
    99% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`

const LoadingProfilePic = styled.img`
  position: absolute;
  bottom: -500px;
  right: -50px;
  max-height: 90vh;
  opacity: 0;
  width: 100%;
  height: auto;

  ${Breakpoints.minMedia.tablet} {
    width: 60%;
    left: 50%;
  }

  ${Breakpoints.minMedia.largeDesktop} {
    height: 90vh;
    width: auto;
  }

  &.show {
    animation: loading ${introTime}s linear forwards;
  }

  @keyframes loading {
    0% {
      opacity: 1;
    }
    99% {
      bottom: 0;
      opacity: 1;
    }

    100% {
      opacity: 0;
    }
  }
`

const CTATextContent = styled.div`
  position: absolute;
  top: 15vh;
  left: 0;
  padding: ${Spacings.lg};
  border-radius: 5px;
  opacity: 0;
  transform: translateX(-20px);
  z-index: 1;

  ${Breakpoints.minMedia.tablet} {
    top: 30vh;
  }

  animation: loading-cta 0.2s ${introTime + 0.5}s linear forwards;

  @keyframes loading-cta {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

const CTATitle = styled(StyledTitle)`
  font-size: 48px !important;
  margin-bottom: ${Spacings.sm} !important;

  ${Breakpoints.minMedia.tablet} {
    font-size: 88px !important;
  }
`

const CTASubtitle = styled(StyledTitle)`
  margin-bottom: ${Spacings.sm} !important;

  ${Breakpoints.minMedia.tablet} {
    font-size: 48px !important;
  }
`

const CTAButton = styled.button`
  border: ${Colors.primary} 5px solid;
  color: ${Colors.primary};
  background-color: ${Colors.secondary};
  padding: ${Spacings.sm} ${Spacings.md};
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s all;

  ${Breakpoints.minMedia.tablet} {
    font-size: 24px;
  }

  &:hover {
    background-color: ${Colors.primary};
    color: ${Colors.secondary};
  }
`

const CTAParagraph = styled(StyledParagraph)`
  font-size: 24px;
  ${Breakpoints.minMedia.tablet} {
    font-size: 32px;
  }
`

const Hand = styled.img`
  margin-left: ${Spacings.xs};
`

const CTA = () => {
  const { inView, ref } = useInView({ threshold: 0.8 })
  const [init, setInit] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setInit(true)
    }, 2000)
  }, [])

  return (
    <Container ref={ref}>
      <CTATextContent>
        <CTATitle pageTitle textAlign='left' color='white'>
          Magnus
        </CTATitle>
        <CTASubtitle pageTitle textAlign='left' color='white' noMargin>
          Junghard Jägryd
        </CTASubtitle>
        <CTAParagraph>
          Freelance web developer - Converting ideas and dreams into reality
        </CTAParagraph>
        <Link passHref href='#contact'>
          <StyledLink>
            <CTAButton>
              Say hi!{' '}
              <Hand
                height='30px'
                width='30px'
                alt='hand with fingers splayed'
                src='/assets/hand_with_fingers_splayed_3d_default.png'
              />
            </CTAButton>
          </StyledLink>
        </Link>
      </CTATextContent>
      <ProfilePic
        src='/assets/profile-sm.png'
        srcSet='/assets/profile-sm.png 300w,
        /assets/profile.png 1280w'
        className={inView ? (!init ? 'animate' : 'show') : init ? 'hide' : ''}
      />
      <LoadingProfilePic
        src='assets/loading-profile-sm.png'
        srcSet='assets/loading-profile-sm.png 300w,
             assets/loading-profile.png 1280w'
        className={inView && !init ? 'show' : ''}
      />
    </Container>
  )
}

export default CTA
