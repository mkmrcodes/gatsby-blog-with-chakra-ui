import React from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormikControl from "./FormikControl"
import { Box, Button, Center, Flex, Stack } from "@chakra-ui/react"
import { MdBuild } from "react-icons/md"

const FormikContainer = () => {
  const initialValues = {
    email: "",
    password: "",
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "En Az 8 Karakter, Bir Büyük Harf, Bir Küçük Harf, Bir Rakam ve Bir Özel Karakter İçermelidir"
      ),
  })
  const onSubmit = values => console.log("Form data", values)
  return (
    <Flex direction="column" align="center" m="0 auto">
      <Box maxW="sm">
        <Center>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form>
                <FormikControl
                  control="input"
                  type="email"
                  label="Email"
                  name="email"
                />
                <FormikControl
                  control="input"
                  type="password"
                  label="Password"
                  name="password"
                />

                <Button
                  leftIcon={<MdBuild />}
                  colorScheme="pink"
                  variant="solid"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Center>
      </Box>
    </Flex>
  )
}

export default FormikContainer
