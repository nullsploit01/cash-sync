import { Fragment } from 'react'
import { Input, Text } from 'tamagui'

import { IInputFieldProps } from 'src/types/components/atoms'

const InputField = ({ error, errorMessage, ...props }: IInputFieldProps) => {
  return (
    <Fragment>
      <Input
        borderColor={error ? 'red' : 'black'}
        focusStyle={{
          borderColor: error ? 'red' : 'black',
          borderWidth: 2
        }}
        {...props}
      />
      {error && errorMessage && (
        <Text theme="alt2" color="red" padding="$1.5">
          {errorMessage}
        </Text>
      )}
    </Fragment>
  )
}

export default InputField
