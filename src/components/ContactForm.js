import React, { useState } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormikControl from "./FormikControl"
import { Box, Button, Center, Flex, Stack, Text } from "@chakra-ui/react"
import { RiMailSendLine } from "react-icons/Ri"
import telegramPush from "telegram-push"

const ContactForm = () => {
  const [isMsgSentProgress, setIsMsgSentProgress] = useState(false)
  const [isMsgSuccess, setIsMsgSuccess] = useState(false)
  const [isMsgFail, setIsMsgFail] = useState(false)
  const bot_chatID = "-399843892"
  const initialValues = {
    fullName: "",
    email: "",
    details: "",
  }
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Geri dönüş için bu alanı doldurmalısınız"),
    email: Yup.string()
      .email("Geçersiz e-posta adresi")
      .required("Geri dönüş için bu alanı doldurmalısınız"),
    details: Yup.string().required("Geri dönüş için bu alanı doldurmalısınız"),
  })
  const onSubmit = async values => {
    setIsMsgSentProgress(true)
    const { fullName, email, details } = values
    console.log(process.env.TELEGRAM_URL)
    console.log(process.env.TELEGRAM_BOT_TOKEN)
    //console.log(`sender:${fullName} email: ${email} message: ${details}`)
    try {
      await telegramPush.sendAsync(
        bot_chatID,
        `sender:${fullName} email: ${email} message: ${details}`
      )
      setIsMsgSentProgress(false)
      setIsMsgSuccess(true)
      console.log("message sent")
    } catch (err) {
      setIsMsgSentProgress(false)
      setIsMsgFail(true)
    }
  }
  return (
    <Flex
      direction="column"
      align="center"
      m="0 auto"
      py={12}
      bg="#333A3F"
      color="#fff"
    >
      <Text p={4} fontSize={{ base: "32px", md: "36px", lg: "40px" }}>
        İletişim
      </Text>
      <Box>
        <Center>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form>
                <Stack
                  direction={["column", "column", "row"]}
                  spacing="12px"
                  mx={4}
                >
                  <Box>
                    <FormikControl
                      control="input"
                      type="text"
                      label="İsim ve Soyisim"
                      name="fullName"
                    />
                  </Box>
                  <Box>
                    <FormikControl
                      control="input"
                      type="email"
                      label="E-Posta"
                      name="email"
                    />
                  </Box>
                </Stack>
                <Stack direction="column" spacing="12px" mx={4}>
                  <FormikControl
                    control="textarea"
                    type="text"
                    label="Konu"
                    name="details"
                  />
                  {isMsgFail ? (
                    <Box
                      bg="tomato"
                      w="100%"
                      p={2}
                      mt="30px !important"
                      color="white"
                      borderRadius="md"
                      textAlign="center"
                    >
                      Hata! Lütfen daha sonra tekrar deneyiniz
                    </Box>
                  ) : null}
                  {isMsgSuccess ? (
                    <Box
                      bg="tomato"
                      w="100%"
                      p={2}
                      mt="30px !important"
                      color="white"
                      borderRadius="md"
                      textAlign="center"
                    >
                      Teşekkürler. Sizinle en kısa zamanda iletişime
                      geçilecektir.
                    </Box>
                  ) : (
                    <Box mt="30px !important" textAlign="center">
                      <Button
                        isLoading={isMsgSentProgress}
                        leftIcon={<RiMailSendLine />}
                        colorScheme="whatsapp"
                        variant="solid"
                        type="submit"
                        px={12}
                        color="#4b4f56"
                        _hover={{ bg: "#ebedf0" }}
                        letterSpacing={"wide"}
                        disabled={!formik.isValid}
                      >
                        Gönder
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Form>
            )}
          </Formik>
        </Center>
      </Box>
    </Flex>
  )
}

export default ContactForm
