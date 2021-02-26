import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { MDXRenderer } from "gatsby-plugin-mdx"
import SEO from "../components/seo"
import kebabCase from "lodash/kebabCase"
import {
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
} from "react-icons/fa"
import Layout from "../components/layout"
import {
  Avatar,
  Badge,
  Box,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import NewsLetter from "../components/NewsLetter"

const BlogPostTemplate = ({ data, pageContext }) => {
  const post = data.mdx
  const imgSource = post.frontmatter.cover.childImageSharp.fluid
  const seoImage = post.frontmatter.cover.childImageSharp.resize
  const tags = post.frontmatter.tags
  const { previous, next } = pageContext
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        image={seoImage}
        pathname={post.frontmatter.slug}
      />

      <Container maxWidth="80ch">
        <Box mt={8} color="black" mx={2}>
          <VStack>
            <Heading as="h2" size="2xl" mb={4} fontFamily="Oswald">
              {post.frontmatter.title}
            </Heading>
            <Heading as="h3" size="lg" mb={4} fontFamily="Oswald">
              {post.frontmatter.subtitle}
            </Heading>
          </VStack>
          <Stack
            direction={["column", "column", "row", "row"]}
            my={2}
            justify="space-between"
            p={2}
          >
            <HStack justify="start">
              <Avatar
                size="md"
                name="author"
                src="https://lh3.googleusercontent.com/ogw/ADGmqu-Lhsqv2U8gGEq07wWr1jIG8mVoQRbQGKVSb7pbrQ=s83-c-mo"
              ></Avatar>
              <Box fontFamily="Ubuntu">
                <Text fontSize="0.8rem">{post.frontmatter.author}</Text>
                <Text fontSize="0.8rem">
                  {post.frontmatter.date} · {post.frontmatter.min2read}{" "}
                  dakikalık okuma
                </Text>
              </Box>
            </HStack>
            <HStack justify={["start", "end", "end"]}>
              <FaTwitter size="24px" />
              <FaLinkedin size="24px" />
              <FaInstagram size="24px" />
              <FaFacebookSquare size="24px" />
            </HStack>
          </Stack>

          <Img
            fluid={imgSource}
            alt={post.frontmatter.coverCredit}
            objectFit="cover"
          />
          <Center>
            <Text>{post.frontmatter.coverCredit}</Text>
          </Center>
          <MDXRenderer>{post.body}</MDXRenderer>
          <Divider borderTop="2px solid gray" mt={2} />
          {tags.map((tag, index) => {
            return (
              <Link key={index} to={`/tags/${kebabCase(tag)}/`}>
                <Badge p={2} m={2}>
                  {tag}
                </Badge>
              </Link>
            )
          })}
          <HStack justify="end">
            <FaTwitter size="24px" />
            <FaLinkedin size="24px" />
            <FaInstagram size="24px" />
            <FaFacebookSquare size="24px" />
          </HStack>
          <Divider borderTop="2px solid gray" mt={2} />
          <HStack justify="space-between" mt={4}>
            {previous && (
              <LinkBox
                key={previous.id}
                bg="#1a8917"
                color="white"
                _hover={{ backgroundColor: "#0F730C", color: "white" }}
                rounded="md"
                p={2}
                borderWidth="1px"
                width="120px"
              >
                <LinkOverlay as={Link} to={previous.fields.slug} rel="prev">
                  <HStack>
                    <FaRegArrowAltCircleLeft size="24px" />
                    <Text fontSize="sm">ÖNCEKİ</Text>
                  </HStack>
                </LinkOverlay>
              </LinkBox>
            )}
            {!previous && (
              <LinkBox
                bg="#1a8917"
                color="white"
                _hover={{ backgroundColor: "#0F730C", color: "white" }}
                rounded="md"
                p={2}
                borderWidth="1px"
                width="120px"
              >
                <LinkOverlay as={Link} to="/blog" rel="blogMain">
                  <HStack>
                    <FaRegArrowAltCircleLeft size="24px" />
                    <Text fontSize="sm">HEPSİ</Text>
                  </HStack>
                </LinkOverlay>
              </LinkBox>
            )}
            {next && (
              <LinkBox
                key={next.id}
                bg="#1a8917"
                color="white"
                _hover={{ backgroundColor: "#0F730C", color: "white" }}
                rounded="md"
                p={2}
                borderWidth="1px"
                width="120px"
              >
                <LinkOverlay as={Link} to={next.fields.slug} rel="next">
                  <HStack justify="end">
                    <Text fontSize="sm">SONRAKİ</Text>
                    <FaRegArrowAltCircleRight size="24px" />
                  </HStack>
                </LinkOverlay>
              </LinkBox>
            )}
          </HStack>
        </Box>
        <NewsLetter />
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
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
            resize(width: 800) {
              src
              height
              width
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
`
