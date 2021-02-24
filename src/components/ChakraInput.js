import React from "react"
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react"
import { Field } from "formik"

const ChakraInput = props => {
  const { label, name, ...rest } = props
  return (
    <Field name={name}>
      {({ field, form }) => {
        return (
          <FormControl isInvalid={form.errors[name] && form.touched[name]}>
            <FormLabel htmlFor={name} mb={0}>
              {label}
            </FormLabel>
            <Input
              id={name}
              {...rest}
              bg="#272e33"
              color="#fff"
              _hover={{ bg: "#20252A" }}
              {...field}
            />
            <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
          </FormControl>
        )
      }}
    </Field>
  )
}

export default ChakraInput
