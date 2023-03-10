import { deviceDimensions } from '../../helpers/device-dimensions'

// Use to set the size of @module styled-components and normalize them to device size.
export const size = (n) => `${deviceDimensions(n)}px`

// Use it to format the pixels to a whole @type {number}, useful for stylesheet.
export const parseSize = (size) => {
    deviceDimensions(Number(size.split('px')[0]))
}