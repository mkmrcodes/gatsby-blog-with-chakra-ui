import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Text,
  LinkBox,
  LinkOverlay,
  Avatar,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { FaRegArrowAltCircleRight } from "react-icons/fa"
import TagsSideBar from "../components/TagsSideBar"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMdx.edges

    return (
      <Layout>
        {/*         <Box>{this.props.location}</Box>
        <Box>{siteTitle}</Box> */}

        <Box maxW="1200px" m="auto">
          <Grid templateColumns="repeat(6, 1fr)" gap={2}>
            <GridItem colSpan={[6, 6, 6, 2]} mt={8} m="8 auto">
              <TagsSideBar />
            </GridItem>

            <GridItem colSpan={[6, 6, 6, 4]} mt={8}>
              <Container mt={8} color="black">
                <Center>
                  <SimpleGrid
                    columns={{ sm: 1, md: 2 }}
                    spacingX="20px"
                    spacingY="40px"
                  >
                    {posts.map(({ node }) => {
                      const {
                        title,
                        coverCredit,
                        author,
                        slug,
                        min2read,
                      } = node.frontmatter
                      const imgSource =
                        node.frontmatter.cover.childImageSharp.fluid

                      return (
                        <LinkBox
                          key={node.id}
                          _hover={{ boxShadow: "outline" }}
                          rounded="md"
                          p={2}
                          borderWidth="1px"
                        >
                          <Box minWidth="330px">
                            <Img
                              fluid={imgSource}
                              alt={coverCredit}
                              objectFit="cover"
                            />
                          </Box>

                          <Heading as="h4" size="md" my={2}>
                            <LinkOverlay as={Link} to={slug}>
                              {title}
                            </LinkOverlay>
                          </Heading>
                          <HStack my={2}>
                            <Avatar
                              size="sm"
                              name="author"
                              src="https://lh3.googleusercontent.com/ogw/ADGmqu-Lhsqv2U8gGEq07wWr1jIG8mVoQRbQGKVSb7pbrQ=s83-c-mo"
                            ></Avatar>
                            <Box>
                              <Text fontSize="xs">{author}</Text>
                              <Text fontSize="xs">{node.frontmatter.date}</Text>
                            </Box>
                          </HStack>

                          <Text fontSize="sm">{node.excerpt}</Text>
                          <HStack justify="end">
                            <Text fontSize="xs">{`${min2read} dakikalık okuma`}</Text>

                            <FaRegArrowAltCircleRight
                              size="24px"
                              color="#663695"
                            />
                          </HStack>
                        </LinkBox>
                      )
                    })}
                  </SimpleGrid>
                </Center>
              </Container>
            </GridItem>
          </Grid>
        </Box>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            cover {
              publicURL
              childImageSharp {
                fluid(maxWidth: 1200, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "DD MMMM YYYY")
            title
            subtitle
            slug
            author
            min2read
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`
