import { readonly } from '../helpers/readonly'

export const fonts = () =>
  readonly({
    nunitoSansBold: require('./fonts/nunitoSans-bold.ttf'),
    nunitoSansLight: require('./fonts/nunitoSans-light.ttf'),
    nunitoSansRegular: require('./fonts/nunitoSans-regular.ttf'),
    robotoBold: require('./fonts/roboto-bold.ttf'),
    robotoMedium: require('./fonts/roboto-medium.ttf'),
    robotoRegular: require('./fonts/roboto-regular.ttf'),
  })

export const images = readonly({
  noConnection: () => require('./images/empty-states/no-connection.svg'),
})

export const icons = readonly({
  arrowLeft: () => require('./images/icons/arrow-left.svg'),
  close: () => require('./images/icons/close.svg'),
  github: () => require('./images/icons/github.svg'),
  user: () => require('./images/icons/user.svg'),
  verified: () => require('./images/icons/verified.svg'),
})

export const resources = readonly({
  images,
  fonts,
  icons
})
