import emailjs from "@emailjs/browser";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { Colors } from "../styles/colors";
import { Spacings } from "../styles/spacings";
import { socialMedia } from "../utils/social-media";
import { Spacer, StyledLink, StyledParagraph, StyledTitle } from "./shared";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-bottom: ${Spacings.xl};
`;

const StyledButton = styled(Button)`
  background-color: ${Colors.primary};
  border: 0;
  color: #333;

  &:hover {
    background-color: ${Colors.primary};
    color: #333;
  }
`;

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 400px;
`;

const FormContainer = styled.div`
  width: 100%;
  background-color: ${Colors.secondary}70;
  padding: ${Spacings.md};
  padding-top: ${Spacings.lg};
  margin-bottom: ${Spacings.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SocialMedia = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const AnimatedSocialMedia = styled.a<{ left?: boolean }>`
  opacity: 0;
  transform: translate(${({ left }) => (left ? "-40px" : "40px")});
  transition: all 0.3s;

  &.show {
    opacity: 1;
    transform: translate(0);
  }
`;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const { inView, ref } = useInView({ threshold: 1 });
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const EMAILJS_PUBLIC_ID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_ID ?? "";

  const handleSubmit = async (values: any) => {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      values,
      EMAILJS_PUBLIC_ID
    );
    if (response.status === 200) {
      setTimeout(() => {
        setSubmitted(true);
      }, 100);
    }
  };

  return (
    <Container>
      <Spacer size={Spacings.xxl} />
      <StyledTitle id="contact" level={1}>
        Lets jam!
      </StyledTitle>
      <Spacer size={Spacings.lg} />
      <StyledParagraph>
        Contact me if you have any questions or just want to say hi!
      </StyledParagraph>
      <FormContainer>
        {!submitted ? (
          <StyledForm onFinish={handleSubmit}>
            <Form.Item name="name">
              <Input
                style={{
                  borderRadius: "4px",
                  border: "none",
                  boxShadow: "1px 2px #00000030",
                }}
                type="text"
                placeholder="Name"
                required
              />
            </Form.Item>
            <Form.Item name="email">
              <Input
                style={{
                  borderRadius: "4px",
                  border: "none",
                  boxShadow: "1px 2px #00000030",
                }}
                type="text"
                placeholder="Email"
                required
              />
            </Form.Item>
            <Form.Item name="message">
              <Input.TextArea
                style={{
                  borderRadius: "4px",
                  border: "none",
                  boxShadow: "1px 2px #00000030",
                }}
                placeholder="Message"
                required
              />
            </Form.Item>
            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
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
      <Spacer size={Spacings.xxl} />
      <SocialMedia ref={ref}>
        <AnimatedSocialMedia
          className={inView ? "show" : ""}
          left
          href={socialMedia.linkedin.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandLinkedin size="48px" />
        </AnimatedSocialMedia>
        <Spacer direction="horizontal" />
        <AnimatedSocialMedia
          className={inView ? "show" : ""}
          href={socialMedia.github.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconBrandGithub size="48px" />
        </AnimatedSocialMedia>
      </SocialMedia>
      <Spacer size={Spacings.md} />
      <StyledTitle style={{ marginBottom: Spacings.xxl }} level={5}>
        This website is open sourced on{" "}
        <StyledLink
          href="https://github.com/Storken/portfolio-v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </StyledLink>
      </StyledTitle>
      <Spacer size={Spacings.md} />
      <StyledLink href="#up-top">To the top</StyledLink>
      <Spacer size={Spacings.md} />
      <StyledTitle level={5}>©️ 2024 Junghard Software AB</StyledTitle>
      <Spacer size={Spacings.xl} />
    </Container>
  );
};

export default Contact;
