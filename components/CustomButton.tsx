import { useEffect, useRef } from 'react'
import { View, Pressable, Text, StyleSheet, Animated, Easing } from 'react-native'
import Svg, { Path } from 'react-native-svg'

function LoadingSvg() {
  const spinValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    )

    animation.start()

    return () => {
      animation.stop()
      spinValue.setValue(0)
    }
  }, [spinValue])

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <View className='flex justify-center items-center'>
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg width={20} height={20} viewBox='0 0 24 24' fill='none'>
          <Path d='M20 12a8 8 0 01-11.76 7.061' stroke='#fff' strokeWidth={3.55556} strokeLinecap='round' />
        </Svg>
      </Animated.View>
    </View>
  )
}

interface CustomButtonProps {
  styles?: 'button' | 'cancel'
  title: string
  onPress: () => void
  isLoading?: boolean
  customStyles?: object
}

export default function CustomButton({
  title,
  onPress,
  styles = 'button',
  isLoading = false,
  customStyles = {},
}: CustomButtonProps) {
  return (
    <Pressable
      style={[stylesModal[styles], customStyles]}
      onPress={() => {
        if (!isLoading) onPress()
      }}
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingSvg />
      ) : (
        <Text style={styles === 'button' ? stylesModal.button_text : stylesModal.cancel_text}>{title}</Text>
      )}
    </Pressable>
  )
}

const stylesModal = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    padding: 4,
    backgroundColor: '#8B4513',
  },
  cancel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#8B4513',
    padding: 4,
    backgroundColor: 'transparent',
  },
  button_text: {
    color: '#ffffff',
  },
  cancel_text: {
    color: '#8B4513',
  },
})
