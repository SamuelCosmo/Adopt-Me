import Svg, { Ellipse, Path } from 'react-native-svg'

interface SvgProps {
  width?: number | string
  height?: number | string
  color?: string
}

export default function CatFootPrint({ width = 128, height = 128, color = '#000' }: SvgProps) {
  return (
    <Svg viewBox='0 0 32 32' width={width} height={height}>
      <Ellipse cx={12.5} cy={9.5} rx={2.5} ry={3.5} fill={color} stroke={color} strokeWidth={2} strokeMiterlimit={10} />
      <Ellipse cx={19.5} cy={9.5} rx={2.5} ry={3.5} fill={color} stroke={color} strokeWidth={2} strokeMiterlimit={10} />
      <Ellipse cx={7.5} cy={16.5} rx={2.5} ry={3.5} fill={color} stroke={color} strokeWidth={2} strokeMiterlimit={10} />
      <Ellipse
        cx={24.5}
        cy={16.5}
        rx={2.5}
        ry={3.5}
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeMiterlimit={10}
      />
      <Path
        d='M19 20c-.966-.966-1-3-3-3s-2 2-3 3-4 1.069-4 3.5a2.5 2.5 0 002.5 2.5c1.157 0 3.684-1 4.5-1s3.343 1 4.5 1a2.5 2.5 0 002.5-2.5c0-2.293-3.034-2.534-4-3.5z'
        fill={color}
        stroke={color}
        strokeWidth={2}
        strokeMiterlimit={10}
      />
    </Svg>
  )
}
