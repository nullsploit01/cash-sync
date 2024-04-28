import { Input } from 'tamagui'

import { IInputFieldProps } from 'src/types/components/atoms'

const InputField = ({ ...props }: IInputFieldProps) => {
  return (
    <Input
      borderColor="black"
      focusStyle={{
        borderColor: 'black',
        borderWidth: 2
      }}
      {...props}
    />
  )
}

export default InputField
