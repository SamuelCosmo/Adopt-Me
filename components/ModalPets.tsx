import { AdoptionProps } from '@/utils/interfaces'
import { useEffect, useRef, useState } from 'react'
import { Animated, Image, FlatList, StyleSheet, Text, View, Modal, Pressable, Dimensions } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { useRouter } from 'expo-router'

interface Props {
  openModal: boolean
  setOpenModal: (value: boolean) => void
  petToShow: AdoptionProps
  enableEdit?: boolean
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

export default function ModalPets({ openModal, setOpenModal, petToShow, enableEdit = false }: Props) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [openModal])

  const petImages = petToShow?.images?.length > 0 ? petToShow.images : [{ url: '' }]

  const dotWidths = useRef<Animated.Value[]>(petImages.map((_, i) => new Animated.Value(i === 0 ? 16 : 8)))

  useEffect(() => {
    dotWidths.current = petImages.map((_, i) => new Animated.Value(i === 0 ? 16 : 8))
    setCurrentImageIndex(0)
  }, [petToShow])

  useEffect(() => {
    if (!dotWidths.current.length) return
    Animated.parallel(
      dotWidths.current.map((anim, i) =>
        Animated.timing(anim, {
          toValue: i === currentImageIndex ? 16 : 8,
          duration: 200,
          useNativeDriver: false,
        }),
      ),
    ).start()
  }, [currentImageIndex])

  const handlePrimaryAction = () => {
    if (enableEdit) {
      setOpenModal(false)
      router.push({
        pathname: '/publish_pet',
        params: {
          pet: JSON.stringify(petToShow),
        },
      })
      return
    }
  }

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
          <View style={stylesModal.imagesContainer}>
            <View style={stylesModal.imageSliderContainer}>
              <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={petImages}
                keyExtractor={(item, index) => `${item.url}-${index}`}
                getItemLayout={(_, index) => ({
                  length: windowWidth - 30,
                  offset: (windowWidth - 30) * index,
                  index,
                })}
                renderItem={({ item }) => <Image source={{ uri: item.url || '' }} style={stylesModal.image} />}
                onMomentumScrollEnd={(event) => {
                  const nextIndex = Math.round(event.nativeEvent.contentOffset.x / (windowWidth - 30))
                  setCurrentImageIndex(nextIndex)
                }}
              />
            </View>
            <View style={stylesModal.dotsContainer}>
              {petImages.map((_, index) => (
                <Animated.View
                  key={`dot-${index}`}
                  style={[
                    index === currentImageIndex ? stylesModal.dotActive : stylesModal.dotInactive,
                    { width: dotWidths.current[index] ?? (index === currentImageIndex ? 16 : 8) },
                  ]}
                />
              ))}
            </View>
          </View>
          <View style={stylesModal.content}>
            <Text style={stylesModal.petName}>{petToShow?.pet_name}</Text>
            <View style={stylesModal.titleRow}>
              <Text style={stylesModal.brownBoldText}>{petToShow?.title}</Text>
              <View style={stylesModal.ratingRow}>
                {/* {Array.from({ length: 5 }).map((_, index) => (
                  <View key={index}>{index < petToShow.score ? <StarFilledIcon /> : <StarEmptyIcon />}</View>
                ))} */}
              </View>
            </View>
            <Text style={stylesModal.description}>{petToShow?.description}</Text>
            <View style={stylesModal.detailsRow}>
              <Text style={stylesModal.brownBoldText}>Age: {petToShow?.age}</Text>
              <Text style={stylesModal.brownBoldText}>
                {location} {petToShow.city}, {petToShow.state}
              </Text>
            </View>
            <Pressable style={stylesModal.button} onPress={handlePrimaryAction}>
              <Text style={stylesModal.buttonText}>{enableEdit ? 'Edit' : 'Adopt-Me!'}</Text>
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
    gap: 8,
  },
  imagesContainer: {
    position: 'relative',
  },
  imageSliderContainer: {
    width: windowWidth - 30,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  image: {
    height: 450,
    width: windowWidth - 30,
  },
  dotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    position: 'absolute',
    bottom: 16,
    width: '100%',
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#d1d5db',
  },
  dotActive: {
    width: 16,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#8B4513',
  },
  content: {
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
  },
  petName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#8B4513',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 4,
  },
  brownBoldText: {
    fontWeight: '800',
    color: '#8B4513',
  },
  ratingRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
  },
  description: {
    fontSize: 16,
    marginTop: 8,
  },
  detailsRow: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 8,
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
    marginVertical: 8,
    backgroundColor: '#8B4513',
  },
  buttonText: {
    fontWeight: '800',
    color: '#ffffff',
  },
})
