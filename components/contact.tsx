import React, { useState } from 'react'
import styled from 'styled-components'
import { Colors } from '../styles/colors'
import { Spacings } from '../styles/spacings'
import { Spacer, StyledLink, StyledParagraph, StyledTitle } from './shared'
import emailjs from '@emailjs/browser'
import { Button, Form, Input } from 'antd'
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons'
import { socialMedia } from '../utils/social-media'
import { useInView } from 'react-intersection-observer'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('/assets/pattern.svg');
  width: 100%;
  margin-top: ${Spacings.xl};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 30px;
    background: linear-gradient(${Colors.background}, transparent);
  }
`

const StyledButton = styled(Button)`
  background-color: ${Colors.primary};
  border: 0;
  color: #333;

  &:hover {
    background-color: ${Colors.primary};
    color: #333;
  }
`

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
`

const FormContainer = styled.div`
  width: 100%;
  background-color: ${Colors.secondary}70;
  padding: ${Spacings.md};
  padding-top: ${Spacings.lg};
  margin-bottom: ${Spacings.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SocialMedia = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const AnimatedSocialMedia = styled.a<{ left?: boolean }>`
  opacity: 0;
  transform: translate(${({ left }) => (left ? '-40px' : '40px')});
  transition: all 0.3s;

  &.show {
    opacity: 1;
    transform: translate(0);
  }
`

const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const { inView, ref } = useInView({ threshold: 1 })
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? ''
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? ''
  const EMAILJS_PUBLIC_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID ?? ''

  const handleSubmit = async (values: any) => {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      values,
      EMAILJS_PUBLIC_ID
    )
    if (response.status === 200) {
      setTimeout(() => {
        setSubmitted(true)
      }, 100)
    }
  }

  return (
    <Container>
      <Spacer size={Spacings.xxl} />
      <StyledTitle id='contact' level={1}>
        Lets jam!
      </StyledTitle>
      <Spacer size={Spacings.xxl} />
      <FormContainer>
        {!submitted ? (
          <StyledForm onFinish={handleSubmit}>
            <Form.Item name='name'>
              <Input type='text' placeholder='Name' required />
            </Form.Item>
            <Form.Item name='email'>
              <Input type='text' placeholder='Email' required />
            </Form.Item>
            <Form.Item name='message'>
              <Input.TextArea placeholder='Message' required />
            </Form.Item>
            <Form.Item>
              <StyledButton type='primary' htmlType='submit'>
                Send
              </StyledButton>
            </Form.Item>
          </StyledForm>
        ) : (
          <StyledParagraph>
            Thank you, I will be in touch as soon as I can!
          </StyledParagraph>
        )}
      </FormContainer>
      <SocialMedia ref={ref}>
        <AnimatedSocialMedia
          className={inView ? 'show' : ''}
          left
          href={socialMedia.linkedin.link}
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconBrandLinkedin size='48px' />
        </AnimatedSocialMedia>
        <Spacer direction='horizontal' />
        <AnimatedSocialMedia
          className={inView ? 'show' : ''}
          href={socialMedia.github.link}
          target='_blank'
          rel='noopener noreferrer'
        >
          <IconBrandGithub size='48px' />
        </AnimatedSocialMedia>
      </SocialMedia>
      <Spacer size={Spacings.xxl} />
      <StyledTitle level={5}>
        This website is open sourced on{' '}
        <StyledLink
          href='https://github.com/Storken/portfolio-v2'
          target='_blank'
          rel='noopener noreferrer'
        >
          Github
        </StyledLink>
      </StyledTitle>
      <Spacer size={Spacings.xxl} />
      <StyledLink href='#up-top'>To the top</StyledLink>
      <Spacer size={Spacings.xxl} />
    </Container>
  )
}

export default Contact
