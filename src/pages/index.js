import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

import { Box } from "@chakra-ui/react"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="MKMR Blog" />
    <Box>
      <Img
        className="hero-picture"
        fluid={data.file.childImageSharp.fluid}
        objectFit="cover"
        alt="hero"
      />
    </Box>
  </Layout>
)

export default IndexPage
export const query = graphql`
  query {
    file(relativePath: { eq: "heroimage.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1200, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
