import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Pressable, View, Text } from 'react-native'
import OutsidePressHandler from 'react-native-outside-press'

interface UserMenuProps {
  showMenu: boolean
  closeMenu: () => void
}

export default function UserMenu({ showMenu, closeMenu }: UserMenuProps) {
  const router = useRouter()

  return (
    showMenu && (
      <OutsidePressHandler
        onOutsidePress={() => {
          closeMenu()
        }}
      >
        <View style={styles.body}>
          <Pressable
            onPress={() => {
              closeMenu()
              router.push('/profile')
            }}
            style={styles.button}
          >
            <Text className='font-bold text-white'>My Profile</Text>
          </Pressable>
          <View style={styles.divider} />
          <Pressable
            onPress={() => {
              closeMenu()
              alert('Option 2 clicked')
            }}
            style={styles.button}
          >
            <Text className='font-bold text-white'>Sign Out</Text>
          </Pressable>
        </View>
      </OutsidePressHandler>
    )
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    top: 10,
    width: 200,
    borderColor: '#ccc',
    borderWidth: 0,
    backgroundColor: '#9a5c31',
    borderRadius: 4,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    width: '100%',
    textAlign: 'left',
    borderRadius: 4,
  },
})
