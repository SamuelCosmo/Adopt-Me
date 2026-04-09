import { AdoptionProps } from '@/utils/interfaces'
import { View, Image, Text, StyleSheet, Pressable } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { LinearGradient } from 'expo-linear-gradient'

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

interface Props {
  petToShow: AdoptionProps
  onClick: () => void
  orientation?: 'row' | 'column'
}

export default function PetCard({ petToShow, onClick, orientation = 'column' }: Props) {
  const isColumn = orientation === 'column'

  return (
    <View style={[styles.card, isColumn ? styles.cardColumn : styles.cardRow]}>
      <Pressable onPress={onClick} style={styles.overlayPressable}></Pressable>
      <Image
        source={{ uri: petToShow.images[0]?.url || '' }}
        style={[styles.imageBase, isColumn ? styles.imageColumn : styles.imageRow, { height: isColumn ? 250 : 120 }]}
      />
      <View style={isColumn ? styles.contentColumn : styles.contentRow}>
        {isColumn && <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.background} />}
        <Text
          style={[styles.petName, isColumn ? styles.petNameColumn : undefined]}
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {petToShow.pet_name}
        </Text>
        {!isColumn && (
          <Text style={styles.description} numberOfLines={2} ellipsizeMode='tail'>
            {petToShow.description}
          </Text>
        )}
        <View style={isColumn ? styles.metaColumn : styles.metaRow}>
          {!isColumn && <Text style={styles.ageText}>Age: {petToShow.age}</Text>}
          <Text style={isColumn ? styles.locationTextColumn : styles.locationText}>
            {!isColumn && location} {petToShow.city}, {petToShow.state}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
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
    position: 'relative',
  },
  cardColumn: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardRow: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  overlayPressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  imageBase: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  imageColumn: {
    width: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  imageRow: {
    width: '25%',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 0,
  },
  contentColumn: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 16,
    width: '100%',
  },
  contentRow: {
    width: '66.6667%',
    paddingTop: 4,
    paddingBottom: 4,
  },
  petName: {
    color: '#8B4513',
    fontWeight: '800',
  },
  petNameColumn: {
    fontSize: 20,
    color: '#d1d1d1',
  },
  description: {
    fontSize: 16,
  },
  metaColumn: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  metaRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 16 },
  ageText: {
    color: '#8B4513',
    fontWeight: '800',
  },
  locationTextColumn: {
    color: '#d1d1d1',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
  },
  locationText: {
    color: '#8B4513',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'right',
  },
})
