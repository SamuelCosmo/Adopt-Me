import { StarEmptyIcon, StarFilledIcon } from '@/assets/svg/stars'
import { CommentsProps, PetsProps } from '@/utils/interfaces'
import { View, Image, Text, StyleSheet, Pressable } from 'react-native'

interface Props {
  data: CommentsProps
}

export default function CommentCard({ data }: Props) {
  return (
    <View style={styles.card}>
      <Text className='text-xl font-extrabold' style={{ color: '#8B4513' }} numberOfLines={1} ellipsizeMode='tail'>
        {data.commentatorName}
      </Text>
      <Text className='text-base'>{data.comment}</Text>
      <View className='flex flex-row w-full justify-end mt-[8px] mb-[8px]'>
        {Array.from({ length: 5 }).map((_, index) => (
          <View key={index}>{index < data.score ? <StarFilledIcon /> : <StarEmptyIcon />}</View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 0,
    borderRadius: 8,
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
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
})
