import { useUser } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React, { Fragment, useState } from 'react'
import { Avatar, Button, Text, View, XStack, YStack } from 'tamagui'

import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'
import { authService } from 'src/services/api/auth'

const Profile = () => {
  const { user } = useUser()

  const [_user, setUser] = useState({
    name: user.fullName,
    email: user.emailAddresses[0]?.emailAddress
  })
  const [_editMode, setEditMode] = useState({ name: false })

  const onUpdate = async () => {
    if (!_user.name?.trim()) {
      return
    }

    const names = _user.name.split(' ')

    let firstName: string
    let lastName: string

    if (names.length) {
      firstName = names[0]

      if (names.length > 1) {
        lastName = names.slice(1).join(' ')
      }
    }

    try {
      await authService.updateUser(user.id, { first_name: firstName, last_name: lastName })
    } catch (error) {
    } finally {
      setEditMode({ name: false })
    }
  }

  const UpdateButton = () => {
    return (
      <Fragment>
        {_editMode.name && (
          <View padding="$3">
            <Button onPress={onUpdate} backgroundColor="$gray8">
              UPDATE
            </Button>
          </View>
        )}
      </Fragment>
    )
  }

  return (
    <Layout protectedRoute footer={<UpdateButton />}>
      <Stack.Screen options={{ headerTitle: 'Profile', headerRight: null }} />
      <YStack padding="$3">
        <YStack alignItems="center" margin="$5">
          <Avatar circular size="$10">
            <Avatar.Image accessibilityLabel="Cam" src={user.imageUrl} />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
        </YStack>
        {_editMode.name ? (
          <InputField
            placeholder="Name"
            value={_user.name}
            onChange={(e) => {
              const value = e.nativeEvent.text
              setUser((prev) => {
                return { ...prev, name: value }
              })
            }}
          />
        ) : (
          <XStack alignItems="center" justifyContent="space-between">
            <YStack marginTop="$5">
              <Text theme="alt1">Name</Text>
              <Text fontSize="$5">{_user.name}</Text>
            </YStack>
            <PressableText
              onPress={() =>
                setEditMode((prev) => {
                  return { ...prev, name: true }
                })
              }
            >
              <Text color="$blue11Dark">Change</Text>
            </PressableText>
          </XStack>
        )}

        <YStack marginTop="$5">
          <Text theme="alt1">Email Address</Text>
          <Text fontSize="$5">{_user.email}</Text>
        </YStack>
      </YStack>
    </Layout>
  )
}

export default Profile
