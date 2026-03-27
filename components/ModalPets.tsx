import { StarEmptyIcon, StarFilledIcon } from '@/assets/svg/stars'
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
  <Svg width={16} height={16} viewBox='-4 0 32 32'>
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
                  <View key={index}>{index < petToShow.score ? <StarFilledIcon /> : <StarEmptyIcon />}</View>
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
