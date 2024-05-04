import { Spinner, YStack } from 'tamagui'

const Loading = () => {
  return (
    <YStack padding="$3" justifyContent="center" flexGrow={1}>
      <Spinner size="large" color="$black9" />
    </YStack>
  )
}

export default Loading
