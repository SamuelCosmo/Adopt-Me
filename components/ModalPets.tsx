import { PetsProps } from '@/utils/interfaces'
import { Image, StyleSheet, Text, View, Modal, Pressable, Dimensions, Button } from 'react-native'
import Svg, { Path } from 'react-native-svg'

interface Props {
  openModal: boolean
  setOpenModal: (value: boolean) => void
  petToShow: PetsProps
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const location = (
  <Svg width='16px' height='16px' viewBox='-4 0 32 32'>
    <Path
      d='M118 422a3 3 0 100 6 3 3 0 000-6zm0 8a5 5 0 110-10 5 5 0 010 10zm0-17c-6.627 0-12 5.373-12 12 0 5.018 10.005 20.011 12 20 1.964.011 12-15.05 12-20 0-6.627-5.373-12-12-12z'
      transform='translate(-106 -413)'
      fill='#8B4513'
      stroke='none'
      strokeWidth={1}
      fillRule='evenodd'
    />
  </Svg>
)

const starEmpty = (
  <Svg width='12px' height='12px' viewBox='0 0 1920 1920'>
    <Path
      d='M1306.181 1110.407c-28.461 20.781-40.32 57.261-29.477 91.03l166.136 511.398-435.05-316.122c-28.686-20.781-67.086-20.781-95.66 0l-435.05 316.122 166.25-511.623c10.842-33.544-1.017-70.024-29.591-90.805L178.577 794.285h537.825c35.351 0 66.523-22.701 77.365-56.245l166.25-511.51 166.136 511.397a81.155 81.155 0 0077.365 56.358h537.939l-435.276 316.122zm609.77-372.819c-10.956-33.656-42.014-56.244-77.365-56.244h-612.141l-189.064-582.1C1026.426 65.589 995.367 43 960.017 43c-35.351 0-66.523 22.588-77.365 56.245L693.475 681.344H81.335c-35.351 0-66.41 22.588-77.366 56.244-10.842 33.657 1.017 70.137 29.591 90.918l495.247 359.718-189.29 582.211c-10.842 33.657 1.017 70.137 29.704 90.918 14.23 10.39 31.059 15.586 47.661 15.586 16.829 0 33.657-5.195 47.887-15.699l495.248-359.718 495.02 359.718c28.575 20.894 67.088 20.894 95.775.113 28.574-20.781 40.433-57.261 29.59-91.03l-189.289-582.1 495.247-359.717c28.687-20.781 40.546-57.261 29.59-90.918z'
      fillRule='evenodd'
      fill='#8B4513'
    />
  </Svg>
)

const starFilled = (
  <Svg width='12px' height='12px' viewBox='0 0 1920 1920'>
    <Path
      d='M1915.918 737.475c-10.955-33.543-42.014-56.131-77.364-56.131h-612.029l-189.063-582.1v-.112C1026.394 65.588 995.335 43 959.984 43c-35.237 0-66.41 22.588-77.365 56.245L693.443 681.344H81.415c-35.35 0-66.41 22.588-77.365 56.131-10.955 33.544.79 70.137 29.478 91.03l495.247 359.831-189.177 582.212c-10.955 33.657 1.13 70.25 29.817 90.918 14.23 10.278 30.946 15.487 47.66 15.487 16.716 0 33.432-5.21 47.775-15.6l495.134-359.718 495.021 359.718c28.574 20.781 67.087 20.781 95.662.113 28.687-20.668 40.658-57.261 29.703-91.03l-189.176-582.1 495.36-359.83c28.574-20.894 40.433-57.487 29.364-91.03'
      fillRule='evenodd'
      fill='#8B4513'
    />
  </Svg>
)

export default function ModalPets({ openModal, setOpenModal, petToShow }: Props) {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(false)
      }}
    >
      <View style={stylesModal.modal}>
        <Pressable style={stylesModal.background} onPress={() => setOpenModal(false)}></Pressable>
        <View style={stylesModal.body}>
          <Image source={petToShow?.srcImage} style={{ height: 250 }} className='rounded-tl-lg rounded-tr-lg w-full' />
          <View className='p-0 pr-[8px] pb-[8px] pl-[8px]'>
            <Text className='text-xl font-extrabold' style={{ color: '#8B4513' }}>
              {petToShow?.name}
            </Text>
            <View className='flex flex-row w-full items-center justify-start align-center gap-[4px]'>
              <Text className='font-extrabold' style={{ color: '#8B4513' }}>
                {petToShow?.owner}
              </Text>
              <View className='flex flex-row gap-[2px]'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <View key={index}>{index < petToShow.score ? starFilled : starEmpty}</View>
                ))}
              </View>
            </View>
            <Text className='text-base mt-[8px]'>{petToShow?.description}</Text>
            <View className='flex flex-row w-full justify-between mt-[8px]'>
              <Text className='font-extrabold' style={{ color: '#8B4513' }}>
                Age: {petToShow?.age}
              </Text>
              <Text className='font-extrabold' style={{ color: '#8B4513' }}>
                {location} {petToShow.city}, {petToShow.state}
              </Text>
            </View>
            <Pressable style={stylesModal.button}>
              <Text className='font-extrabold text-white'>Adopt-Me!</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const stylesModal = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  background: {
    flex: 1,
    backgroundColor: '#7c7c7c',
    opacity: 0.7,
    width: windowWidth,
    height: windowHeight,
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 8,
    width: windowWidth - 30,
    gap: 16,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    padding: 4,
    marginVertical: 4,
    backgroundColor: '#8B4513',
  },
})
