import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import BackgroundImage from "gatsby-background-image"
import { Box, Heading, Text } from "@chakra-ui/react"

const NotFoundPage = ({ data }) => (
  <Layout>
    <SEO title="404: Not found" />
    <Box h="100vh" bg="black">
      <BackgroundImage
        fluid={data.file.childImageSharp.fluid}
        alt="astronaut in space"
      >
        <Box w="100%" h="600px" textAlign="center">
          <Heading size="4xl" color="white" pt="250px">
            4 0 4
          </Heading>
          <Text color="white">LOST IN SPACE ?</Text>
        </Box>
      </BackgroundImage>
      <Text color="black" fontSize="0.8rem">
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@nasa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            NASA
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/astronaut?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </Text>
    </Box>
  </Layout>
)

export default NotFoundPage
export const query = graphql`
  query {
    file(relativePath: { eq: "404.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
