import { createRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Breakpoints } from '../styles/breakpoints'
import { Colors } from '../styles/colors'
import { Spacings } from '../styles/spacings'

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding: ${Spacings.lg};
  background: linear-gradient(transparent, ${Colors.background}, ${Colors.background}, transparent);
`

const Duck = styled.img``

const DuckWalk = () => {
  const [y, setY] = useState(0)

  const onScroll = () => {
    let scrollY = window.scrollY * 1.3
    if (window.innerWidth > 992) {
      scrollY *= 2
    }
    setY(() => scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
  }, [])

  return (
    <Container>
      <Duck
        width='40px'
        height='40px'
        src='/assets/duck.svg'
        style={{
          transform: `translateX(${(y * 1.3) %
            window.innerWidth}px) rotateZ(${(Math.floor(y / 10) % 10) -
            5}deg) scaleX(-1)`
        }}
      />
    </Container>
  )
}

export default DuckWalk
