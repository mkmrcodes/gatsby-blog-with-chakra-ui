import React from "react"
import ChakraInput from "./ChakraInput"
import ChakraTextArea from "./ChakraTextArea"

const FormikControl = props => {
  const { control, ...rest } = props
  switch (control) {
    case "input":
      return <ChakraInput {...rest} />
    case "textarea":
      return <ChakraTextArea {...rest} />
    case "select":
    case "radio":
    case "checkbox":
    case "date":
    default:
      return null
  }
}

export default FormikControl
