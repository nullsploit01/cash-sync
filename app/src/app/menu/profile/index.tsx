import { useUser } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Avatar, Text, XStack, YStack } from 'tamagui'

import InputField from 'src/components/atoms/input'
import PressableText from 'src/components/atoms/pressable-text'
import Layout from 'src/components/layout'

const Profile = () => {
  const { user } = useUser()

  const [_user, setUser] = useState({
    name: user.fullName,
    email: user.emailAddresses[0]?.emailAddress
  })
  const [_editMode, setEditMode] = useState({ name: false })

  return (
    <Layout protectedRoute>
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
