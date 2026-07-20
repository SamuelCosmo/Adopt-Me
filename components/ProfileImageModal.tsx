import React, { useState } from 'react'
import { View, Text, Pressable, Modal, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { updateProfileImage } from '@/store/slices/userSlice'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store/StoreContext'

interface ProfileImageModalProps {
  visible: boolean
  onClose: () => void
  userProfileImage: string
}

export default function ProfileImageModal({ visible, onClose, userProfileImage }: ProfileImageModalProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [modalMode, setModalMode] = useState<'options' | 'preview' | 'view'>('options')

  const pickImageFromGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la galería para seleccionar una imagen.')
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setModalMode('preview')
    }
  }

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara para tomar una foto.')
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      setModalMode('preview')
    }
  }

  const confirmUpload = () => {
    if (selectedImage) {
      dispatch(updateProfileImage(selectedImage))
      setSelectedImage(null)
      setModalMode('options')
      onClose()
    }
  }

  const handleClose = () => {
    setSelectedImage(null)
    setModalMode('options')
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        {modalMode === 'options' && (
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, marginBottom: 20, textAlign: 'center' }}>Opciones de imagen de perfil</Text>
            <Pressable onPress={pickImageFromGallery} style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontSize: 16 }}>Escoger de galería</Text>
            </Pressable>
            <Pressable onPress={takePhoto} style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontSize: 16 }}>Tomar foto</Text>
            </Pressable>
            <Pressable onPress={() => setModalMode('view')} style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <Text style={{ fontSize: 16 }}>Ver foto expandida</Text>
            </Pressable>
            <Pressable onPress={handleClose} style={{ padding: 15 }}>
              <Text style={{ fontSize: 16, color: 'red' }}>Cancelar</Text>
            </Pressable>
          </View>
        )}
        {modalMode === 'preview' && selectedImage && (
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Previsualización</Text>
            <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 10 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <Pressable onPress={confirmUpload} style={{ padding: 10, backgroundColor: 'green', borderRadius: 5, flex: 1, marginRight: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Confirmar</Text>
              </Pressable>
              <Pressable onPress={() => { setSelectedImage(null); setModalMode('options'); }} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5, flex: 1 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        )}
        {modalMode === 'view' && userProfileImage && (
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 20 }}>Foto de perfil</Text>
            <Image source={{ uri: userProfileImage }} style={{ width: 300, height: 300, marginBottom: 20, borderRadius: 10 }} />
            <Pressable onPress={handleClose} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5 }}>
              <Text style={{ color: 'white' }}>Cerrar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  )
}