import { Typography } from 'antd'
import Paragraph from 'antd/lib/typography/Paragraph'
import styled from 'styled-components'
import { Breakpoints } from '../styles/breakpoints'
import { Spacings } from '../styles/spacings'

const { Title } = Typography

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin-bottom: ${Spacings.xl};
`

export const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`

export const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledParagraph = styled(Paragraph)`
  margin-bottom: ${Spacings.md};
  max-width: 500px;
  color: white;
`

export const StyledLink = styled.a<{
  dark?: boolean
  skipUnderline?: boolean
  bold?: boolean
}>`
  color: ${({ dark }) => (dark ? 'darkcyan' : 'white')} !important;
  text-decoration: ${({ skipUnderline }) =>
    skipUnderline ? 'none' : 'underline'} !important;
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  font-size: 18px;
  cursor: pointer;
`

export const TooltipContainer = styled.div`
  display: flex;
  svg {
    flex-shrink: 0;
    margin-top: ${Spacings.xs};
    margin-right: ${Spacings.sm};
  }
`

const getPadding = (direction: string, size: string, mobile?: boolean) => {
  if (!mobile) return ''
  return direction === 'vertical'
    ? `padding-bottom: ${size}`
    : `padding-right: ${size}`
}

const SpacerDiv = styled.div<{
  direction: 'vertical' | 'horizontal'
  size: string
  mobile?: boolean
}>`
  ${({ direction, size, mobile }) => getPadding(direction, size, mobile)}

  ${Breakpoints.minMedia.tablet} {
    ${({ direction, size }) => getPadding(direction, size, true)}
  }
`

export const Spacer = ({
  mobile = true,
  size = Spacings.md,
  direction = 'vertical'
}: {
  mobile?: boolean
  size?: string
  direction?: 'vertical' | 'horizontal'
}) => {
  return <SpacerDiv direction={direction} size={size} mobile={mobile} />
}

export enum Theme {
  INTRO,
  LORE,
  ABOUT,
  FAQ
}

export const StyledTitle = styled(Title)<{
  textAlign?: string
  color?: string
  stroke?: string
  noMargin?: boolean
  pageTitle?: boolean
}>`
  margin: ${({ noMargin }) => (noMargin ? '0 !important' : 'inherit')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  color: ${({ color }) => (color ? color : 'inherit')} !important;
  -webkit-text-stroke: ${({ stroke }) => (stroke ? `${stroke} 2px` : 'none')};
  ${({ pageTitle }) => (pageTitle ? 'font-size: 32px !important;' : '')}

  ${Breakpoints.minMedia.tablet} {
    ${({ pageTitle }) => (pageTitle ? 'font-size: 64px !important;' : '')}
  }
`
