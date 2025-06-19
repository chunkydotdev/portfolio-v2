import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../styles/breakpoints";
import { Colors } from "../styles/colors";
import { Spacings } from "../styles/spacings";
import Project from "./project";
import { Spacer, StyledLink, StyledTitle } from "./shared";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
  padding-bottom: ${Spacings.xl};
`;

const CTALink = styled(StyledLink)`
  text-decoration: underline !important;
  font-size: 24px;
  position: relative;

  ${Breakpoints.minMedia.desktop} {
    font-size: 28px !important;
  }
`;

const BouncingHeart = styled.div`
  background-color: white;
  display: inline-block;
  height: 20px;
  position: relative;
  top: -20px;
  right: -6px;
  width: 20px;
  animation: bounce 2s infinite alternate-reverse;

  @keyframes bounce {
    from {
      transform: translate(-5px, 5px);
    }
    to {
      transform: translate(10, -10px);
    }
  }

  &:before,
  &:after {
    content: "";
    background-color: white;
    border-radius: 50%;
    height: 20px;
    position: absolute;
    width: 20px;
  }

  &:before {
    top: -10px;
    left: 0px;
  }

  &:after {
    left: 10px;
    top: 0;
  }
`;

const ProjectsFooter = styled.div`
  width: 100%;
  background-color: ${Colors.secondary}70;
  padding-top: ${Spacings.lg};
  padding-bottom: ${Spacings.md};
  margin-top: ${Spacings.xxl};
`;

const Projects = () => {
	const projects = [
		{
			title: "Linkbun",
			description:
				"A place to store collections (buns) of links so that you can share them with eachother",
			image: {
				lg: "/assets/linkbun.png",
			},
			stack: ["react", "nextjs", "tailwind-css", "firebase"],
			url: "https://linkbun.io",
		},
		{
			title: "Felio",
			description:
				"A tool to help people in sweden report broken infrastructure, trash and other issues.",
			image: {
				lg: "/assets/felio.png",
			},
			stack: ["react", "nextjs", "tailwind-css", "firebase", "mongodb"],
			url: "https://felio.se",
		},
		{
			title: "HappyPanda",
			description:
				"Helps businesses collect and analyze feedback from customers.",
			image: {
				lg: "/assets/happypanda.png",
			},
			stack: [
				"react",
				"nextjs",
				"tailwind-css",
				"shadcn",
				"firebase-auth",
				"mongodb",
			],
			url: "https://happypanda.ai",
		},
		{
			title: "Pomoti.me",
			description:
				"A pomodoro timer for your browser, with project tracking and customizable shareable timers.",
			image: {
				lg: "/assets/pomotime.png",
			},
			stack: ["react", "nextjs", "tailwind-css", "shadcn"],
			url: "https://pomoti.me",
		},
		{
			title: "Dank.Tools",
			description:
				"A tool to help you create a time-tag for discord which gives the same time in different timezones.",
			image: {
				lg: "/assets/danktools.png",
			},
			stack: ["react", "nextjs", "styled-components"],
			url: "https://dank.tools",
		},
		{
			title: "Buildable",
			description:
				"Bring the idea. Buildable plans the backlog, scaffolds a private repo, then streams MCP tasks to any AI assistant.",
			image: {
				lg: "/assets/bldbl.png",
			},
			stack: ["react", "nextjs", "shadcn", "neobrutalism.dev", "supabase"],
			url: "https://bldbl.dev",
		},
	];

	return (
		<Container id="projects">
			<Spacer size={Spacings.xxl} />
			<StyledTitle level={1}>Highlighted projects</StyledTitle>
			{projects.map((props) => (
				<React.Fragment key={props.title}>
					<Spacer size={Spacings.xxl} />
					<Project key={props.title} {...props} />
				</React.Fragment>
			))}
			<ProjectsFooter>
				<StyledTitle noMargin level={3}>
					You are special!
					<BouncingHeart />
				</StyledTitle>
			</ProjectsFooter>
		</Container>
	);
};

export default Projects;
