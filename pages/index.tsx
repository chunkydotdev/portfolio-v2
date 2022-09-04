import { NextPage } from 'next'
import { createRef, useEffect, UIEvent, UIEventHandler } from 'react'
import styled from 'styled-components'
import CTA from '../components/cta'
import PreviousPartners from '../components/previous-partners'
import { Spacer } from '../components/shared'
import { Breakpoints } from '../styles/breakpoints'
import { Colors } from '../styles/colors'
import { Spacings } from '../styles/spacings'
import dynamic from 'next/dynamic'
import Contact from '../components/contact'

const Projects = dynamic(() => import('../components/projects'), { ssr: false })
const DuckWalk = dynamic(() => import('../components/duck-walk'), {
  ssr: false
})

const Container = styled.div`
  min-height: 100vh;
  overflow-x: hidden;
  align-items: center;
  background-color: ${Colors.background};
  padding: 0;
`

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('/assets/pattern.svg');
`

const Home: NextPage = () => {
  return (
    <Container id='up-top'>
      <Background>
        <CTA />
        <Spacer size={Spacings.xxl} />
        <PreviousPartners />
        <Projects />
      </Background>
      <DuckWalk />
      <Contact />
    </Container>
  )
}

export default Home
