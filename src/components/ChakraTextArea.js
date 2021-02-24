import React from "react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react"
import { Field } from "formik"

const ChakraTextArea = props => {
  const { label, name, ...rest } = props
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name} mb={0}>
              {label}
            </FormLabel>
            <Textarea
              id={name}
              bg="#272e33"
              color="#fff"
              _hover={{ bg: "#20252A" }}
              {...rest}
              {...field}
            />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )
      }}
    </Field>
  )
}

export default ChakraTextArea
