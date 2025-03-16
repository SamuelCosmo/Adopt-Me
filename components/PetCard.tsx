import { PetsProps } from '@/utils/interfaces'
import { View, Image, Text, StyleSheet, Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'

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

interface Props {
  petToShow: PetsProps
  onClick: () => void
  orientation?: 'row' | 'column'
}

export default function PetCard({ petToShow, onClick, orientation = 'column' }: Props) {
  // const isRemote = srcImage.startsWith('http') || srcImage.startsWith('https')

  return (
    <View
      style={styles.card}
      className={orientation === 'column' ? 'flex flex-col rounded-lg' : 'flex items-center flex-row rounded-lg'}
    >
      <Pressable onPress={onClick} className='absolute top-0 left-0 w-full h-full z-10'></Pressable>
      <Image
        source={petToShow.srcImage}
        style={{ height: orientation === 'column' ? 150 : 120 }}
        className={
          orientation === 'column' ? 'rounded-tl-lg rounded-tr-lg w-full' : 'rounded-tl-lg rounded-bl-lg w-1/4'
        }
      />
      <View className={orientation === 'column' ? 'p-0 pr-[8px] pb-[8px] pl-[8px]' : 'pt-[4px] pb-[4px] w-4/6'}>
        <Text
          className={orientation === 'column' ? 'text-xl font-extrabold' : 'font-extrabold'}
          style={{ color: '#8B4513' }}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {petToShow.name}
        </Text>
        <Text className='text-base' numberOfLines={2} ellipsizeMode='tail'>
          {petToShow.description}
        </Text>
        <View className='flex flex-row w-full justify-between mt-[16px]'>
          <Text className='font-extrabold' style={{ color: '#8B4513' }}>
            Age: {petToShow.age}
          </Text>
          <Text className='text-[12px] font-extrabold text-right' style={{ color: '#8B4513' }}>
            {location} {petToShow.city}, {petToShow.state}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    backgroundColor: '#ffffff',
    elevation: 12,
    shadowColor: '#8B4513',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    width: '100%',
    marginBottom: 'auto',
    height: 'auto',
    position: 'relative',
  },
})
