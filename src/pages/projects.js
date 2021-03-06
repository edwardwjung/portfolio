import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";

import GlobalStateProvider from "../context/provider";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Hero from "../components/sections/hero";
import Articles from "../components/sections/articles";
import About from "../components/sections/about";
import Interests from "../components/sections/interests";
import Projects from "../components/sections/projects";
import Contact from "../components/sections/contact";
import { seoTitleSuffix } from "../../config";

const ProjectsPage = ({ data }) => {
  const { frontmatter } = data.index.edges[0].node;
  const { seoTitle, useSeoTitleSuffix, useSplashScreen } = frontmatter;
  console.log("hello");
  console.log(frontmatter);
  console.log(data.hero.edges);
  const globalState = {
    // if useSplashScreen=false, we skip the intro by setting isIntroDone=true
    isIntroDone: useSplashScreen ? false : true,
    // darkMode is initially disabled, a hook inside the Layout component
    // will check the user's preferences and switch to dark mode if needed
    darkMode: false,
  };

  return (
    <GlobalStateProvider initialState={globalState}>
      <Layout>
        <SEO
          title={
            useSeoTitleSuffix
              ? `${seoTitle} - ${seoTitleSuffix}`
              : `${seoTitle}`
          }
        />
        <Hero
          content={
            /*[
            {
              node: {
                frontmatter: {
                  greetings: "",
                  title: "Portfolio",
                  subtitle: "",
                  subtitlePrefix: "Past work that I'm proud of.",
                },
                body: "",
              },
            },
          ]*/ data
              .hero.edges
          }
        />
        <Projects content={data.projects.edges} showViewMore={false} />
      </Layout>
    </GlobalStateProvider>
  );
};

ProjectsPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectsPage;

export const pageQuery = graphql`
  {
    index: allMdx(filter: { fileAbsolutePath: { regex: "/index/index/" } }) {
      edges {
        node {
          frontmatter {
            seoTitle
            useSeoTitleSuffix
            useSplashScreen
          }
        }
      }
    }
    hero: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/index/projects/" }
        frontmatter: { isHero: { eq: true } }
      }
    ) {
      edges {
        node {
          body
          id
          frontmatter {
            greetings
            greetingicon {
              childImageSharp {
                fluid(maxWidth: 80, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
            subtitlePrefix
            subtitle
          }
        }
      }
    }

    projects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/index/projects/" }
        frontmatter: { visible: { eq: true } }
      }
      sort: { fields: [frontmatter___position], order: ASC }
    ) {
      edges {
        node {
          body
          fields {
            slug
          }
          frontmatter {
            title
            category
            emoji
            external
            video
            github
            presentation
            events
            news
            publication
            appStore
            screenshot {
              childImageSharp {
                fluid(maxWidth: 1800, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
            position
            buttonVisible
            buttonUrl
            buttonText
          }
        }
      }
    }
  }
`;
