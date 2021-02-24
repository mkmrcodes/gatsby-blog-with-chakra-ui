import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Heading, VStack, Badge } from "@chakra-ui/react"

const TagsSideBar = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMdx(limit: 1000) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  return (
    <VStack color="black" border="3px solid black">
      <Heading as="h3" size="md" bg="twitter.100">
        TÜM KATEGORİLER
      </Heading>

      {data.allMdx.group.map(tag => (
        <Badge key={tag.fieldValue} textAlign="start">
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </Badge>
      ))}
    </VStack>
  )
}
TagsSideBar.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
  }),
}
export default TagsSideBar
