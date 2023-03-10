import { Dimensions, PixelRatio } from 'react-native'
import { readonly } from './readonly'

// Dimensions of the iPhone 6, 7 and 8.
const minDimensions = readonly({
    with: 375,
    height: 667,
})

const { width, height } = Dimensions.get('window')

const scale = readonly({
    w: width / minDimensions.with,
    h: height / minDimensions.height,
})

const operations = readonly({
    output: (n) => Math.round(PixelRatio.roundToNearestPixel(n)),
    size: (s, based) =>
        based === 'height' ? s * scale.h : s * scale.w,
})

// Adapt a value based on the width or height of the screen
// so that we can use it for width, height, top, fontSize, borderRadius, etc...
export function deviceDimensions(size, based) {
    const newSize = operations.output(operations.size(size, based))

    return newSize
}