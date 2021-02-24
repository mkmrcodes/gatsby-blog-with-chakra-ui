import { Box } from "@chakra-ui/react"
import { Link } from "gatsby"
import React from "react"
import FlagTr from "../../assets/flagtr.svg"
import FlagUs from "../../assets/flagus.svg"

const getIcon = langKey => {
  switch (langKey) {
    case "en":
      return <FlagUs size="36px" />
    case "tr":
      return <FlagTr size="36px" />

    default:
      return null
  }
}

const SelectLanguage = props => {
  const links = props.langs.map(lang => (
    <Link to={lang.link}>
      <li selected={lang.selected}>{getIcon(lang.langKey)}</li>
    </Link>
  ))

  return (
    <Box {...props}>
      <Text>Select your language:</Text>

      <ul>{links}</ul>
    </Box>
  )
}

SelectLanguage.propTypes = {
  langs: PropTypes.array,
}

export default SelectLanguage
