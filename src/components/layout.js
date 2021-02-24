import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import "../css/typography.css"

const theme = extendTheme({
  fonts: {
    heading: "Open Sans",
    body: "Open Sans",
  },

  styles: {
    global: {
      body: {
        bg: "white",
        color: "black",
        fontSize: "21px",
      },
    },
  },
})
const Layout = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Header />

      <main>{children}</main>
    </ChakraProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
