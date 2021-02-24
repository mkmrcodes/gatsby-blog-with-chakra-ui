import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import {
  Avatar,
  Box,
  Center,
  Container,
  Heading,
  LinkBox,
  SimpleGrid,
  LinkOverlay,
  HStack,
  Text,
  Grid,
  GridItem,
  Badge,
} from "@chakra-ui/react"
import { FaRegArrowAltCircleRight } from "react-icons/fa"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  return (
    <Layout>
      <Box maxW="1200px" m="auto">
        <Grid templateColumns="repeat(6, 1fr)" gap={2}>
          <GridItem colSpan={[6, 6, 6, 2]} mt={8} m="8 auto">
            <Container color="black">
              <Badge variant="outline" colorScheme="green" fontSize="1.5rem">
                {tag}
              </Badge>
              <Heading as="h3" size="sm">
                {`etiketli ${totalCount} yazı bulundu`}
              </Heading>
            </Container>
          </GridItem>
          <GridItem colSpan={[6, 6, 6, 4]} mt={8}>
            <Container color="black">
              <Center>
                <SimpleGrid
                  columns={{ sm: 1, md: 2 }}
                  spacingX="20px"
                  spacingY="40px"
                >
                  {edges.map(({ node }) => {
                    const {
                      title,
                      coverCredit,
                      author,
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
                          <LinkOverlay as={Link} to={node.fields.slug}>
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

export default Tags
export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            subtitle
            tags
            author
            min2read
            cover {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            coverCredit
            date(formatString: "DD MMMM YYYY", locale: "tr")
            slug
          }
          body
        }
      }
    }
  }
`
