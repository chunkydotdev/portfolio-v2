import { createRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { Spacings } from '../styles/spacings'

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  padding-top: ${Spacings.lg};
`

const Duck = styled.img``

const DuckWalk = () => {
  const [y, setY] = useState(0)

  const onScroll = () => {
    setY(() => window.scrollY)
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
          transform: `translateX(${y % window.innerWidth}px) rotateZ(${Math.floor(y / 10) %
            10 - 5}deg) scaleX(-1)`
        }}
      />
    </Container>
  )
}

export default DuckWalk
