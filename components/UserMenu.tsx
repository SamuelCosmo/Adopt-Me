import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Pressable, View, Text, Modal } from 'react-native'
import { signOutUser } from '@/store/slices/authSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/StoreContext'

interface UserMenuProps {
  showMenu: boolean
  closeMenu: () => void
}

export default function UserMenu({ showMenu, closeMenu }: UserMenuProps) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  return (
    <Modal visible={showMenu} transparent onRequestClose={closeMenu}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={closeMenu} />
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
            onPress={async () => {
              closeMenu()
              await dispatch(signOutUser())
              router.push('/')
            }}
            style={styles.button}
          >
            <Text className='font-bold text-white'>Sign Out</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
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
