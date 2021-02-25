import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Flex,
  Stack,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormikControl from "./FormikControl"
import telegramPush from "telegram-push"
import { RiMailSendLine } from "react-icons/ri"
import BackgroundImage from "gatsby-background-image"

const NewsLetter = () => {
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false)
  const [isMsgSuccess, setIsMsgSuccess] = useState(false)
  const [isMsgFail, setIsMsgFail] = useState(false)
  const bot_chatID = "-399843892"
  const initialValues = {
    email: "",
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Geçersiz e-posta adresi")
      .required("Bu alanı doldurmalısınız"),
  })
  const onSubmit = async values => {
    setIsMsgSentProgress(true)
    const { email } = values

    try {
      await telegramPush.sendAsync(bot_chatID, `e-bülten kayıt: ${email}`)
      setIsMsgSentProgress(false)
      setIsMsgSuccess(true)
    } catch (err) {
      setIsMsgSentProgress(false)
      setIsMsgFail(true)
    }
  }
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "newsletter.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  const imgSource = data.file.childImageSharp.fluid
  return (
    <>
      <BackgroundImage fluid={imgSource} alt="mail boxes in green garden">
        <Box w="100%">
          <Flex
            direction="column"
            justify="space-evenly"
            align="stretch"
            h="300px"
            mt={8}
            color="white"
            bg="rgba(0, 0, 0, 0.3)"
          >
            <VStack mb={4}>
              <Box textAlign="center">
                <Heading as="h3" size="md" color="tomato">
                  ÜCRETSİZ E-BÜLTEN ABONELİĞİ
                </Heading>
              </Box>
              <Box textAlign="center" px={4}>
                <Text fontSize={{ base: "16px", md: "18px" }}>
                  Yeni yazılarımdan anında haberdar olmak için ücretsiz e-bülten
                  kaydınızı yapabilirsiniz.
                </Text>
              </Box>
            </VStack>
            <VStack>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {formik => (
                  <Form>
                    <Stack direction={["column", "row"]}>
                      <Box>
                        <FormikControl
                          control="input"
                          type="email"
                          placeholder="E-Posta"
                          name="email"
                          visibility={
                            isMsgSuccess || isMsgFail ? "hidden" : "visible"
                          }
                        />
                      </Box>
                      <Box textAlign="end">
                        <Button
                          isLoading={isMsgSentProgress}
                          leftIcon={<RiMailSendLine />}
                          bg="tomato"
                          variant="solid"
                          type="submit"
                          color="white"
                          _hover={{ bg: "red.600" }}
                          letterSpacing={"wide"}
                          disabled={!formik.isValid || isMsgSuccess}
                          visibility={
                            isMsgSuccess || isMsgFail ? "hidden" : "visible"
                          }
                        >
                          ABONE OL
                        </Button>
                      </Box>
                    </Stack>

                    {isMsgFail ? (
                      <Box
                        bg="tomato"
                        w="100%"
                        color="white"
                        borderRadius="md"
                        textAlign="center"
                        p={2}
                        mt={4}
                      >
                        Hata! Lütfen daha sonra tekrar deneyiniz
                      </Box>
                    ) : null}
                    {isMsgSuccess ? (
                      <Box
                        bg="tomato"
                        w="100%"
                        color="white"
                        borderRadius="md"
                        textAlign="center"
                        p={2}
                        mt={2}
                      >
                        Teşekkürler. E-bülten kaydınız alınmıştır.
                      </Box>
                    ) : null}
                  </Form>
                )}
              </Formik>
            </VStack>
          </Flex>
        </Box>
      </BackgroundImage>
      <Text color="black">
        Photo by{" "}
        <a href="https://unsplash.com/@mathyaskurmann?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Mathyas Kurmann
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/s/photos/newsletter?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
          Unsplash
        </a>
      </Text>
    </>
  )
}

export default NewsLetter
