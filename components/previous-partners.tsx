import { createRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Breakpoints } from "../styles/breakpoints";
import { Colors } from "../styles/colors";
import { Spacings } from "../styles/spacings";
import { StyledTitle } from "./shared";

const Container = styled.div`
  height: 300px;
  width: 100%;
  position: relative;
  transition: all 0.2s;
  margin-top: 10vh;

  &.show {
    opacity: 1;
  }

  ${Breakpoints.minMedia.desktop} {
    margin-top: 20vh;
  }
`;

const RotatedTitle = styled(StyledTitle)`
  position: absolute;
  transform: rotateZ(10deg);
  right: 10%;
  color: ${Colors.primary} !important;
  top: 0;
  z-index: 1;
  ${Breakpoints.minMedia.largeDesktop} {
    right: 30%;
  }
`;

const Partner = styled.img`
  margin-right: ${Spacings.lg};

  ${Breakpoints.minMedia.tablet} {
    height: 80px;
    margin-right: ${Spacings.xxl};
  }
`;

const Content = styled.div`
  position: absolute;
  top: 100px;
  display: flex;
  flex-wrap: nowrap;
  transform-origin: left top;
  left: 400px;
  ${Breakpoints.minMedia.laptop} {
    top: 0;
    left: 600px;
  }
  ${Breakpoints.minMedia.largeDesktop} {
    left: 50%;
  }
`;

const PreviousPartners = () => {
  const partners = ["kvd", "polestar", "sendify", "vasttrafik", "astra-zeneca"];
  const [x, setX] = useState(0);
  const ref = createRef<HTMLDivElement>();

  useEffect(() => {
    () => {
      window.removeEventListener("scroll", handleScroll);
    };
    const handleScroll = () => {
      const offset = ref.current?.offsetTop ?? 0;
      setX(window.scrollY - offset);
      if (x > 0) {
        ref.current?.classList.add("show");
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <Container ref={ref}>
      <RotatedTitle level={1} noMargin>
        Happy clients
      </RotatedTitle>
      <Content style={{ transform: `rotate(10deg) translateX(-${x}px)` }}>
        {partners.map((p) => (
          <Partner
            key={"partner-" + p}
            alt={"partner " + p + " logo"}
            src={`assets/${p}-logo.svg`}
            height="40px"
          />
        ))}
      </Content>
    </Container>
  );
};

export default PreviousPartners;
