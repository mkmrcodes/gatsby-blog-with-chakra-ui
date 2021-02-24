import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { MdClose, MdMenu } from "react-icons/md"
import { debounce } from "../utils/helpers"
import MyLogo from "../../assets/mylogo.svg"

const MenuItems = props => {
  const { children, to = "/", ...rest } = props
  return (
    <Text
      mb={{ base: 4, md: 0 }}
      mr={{ base: 0, sm: 8 }}
      display="block"
      _hover={{ color: "#34B7F1" }}
      fontFamily="Audiowide"
      fontSize="1rem"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  )
}

const Header = props => {
  const [show, setShow] = useState(false)
  const toggleMenu = () => setShow(!show)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    )

    setPrevScrollPos(currentScrollPos)
  }, 100)

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollPos, visible, handleScroll])

  return (
    <Flex
      height="60px"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={4}
      bg="rgba(0,0,0,0.8)"
      color="white"
      position="sticky"
      top={visible ? "0" : "-60px"}
      zIndex="99"
      transition="top 0.4s"
      {...props}
    >
      <Flex align="center">
        <Box w="100px">
          <MyLogo />
        </Box>
      </Flex>
      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <MdClose size="36px" /> : <MdMenu size="36px" />}
      </Box>

      <Box
        display={{ base: show && visible ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
        bg="rgba(0,0,0,0.8)"
      >
        <Flex
          align={["center", "center", "center", "center"]}
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "column", "row", "row"]}
          mt={{ base: 4, md: 0 }}
        >
          <MenuItems to="/">Ana Sayfa</MenuItems>
          <MenuItems to="/about">Hakkında</MenuItems>
          <MenuItems to="/projects">Projeler</MenuItems>
          <MenuItems to="/blog">Blog</MenuItems>
          <MenuItems to="/contact">İletişim</MenuItems>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
