import { readonly } from '../../helpers/readonly'
import { stylesGuide } from '../styles'

export const SCREENS = {
    appStack: 'app.main.stack',
    upload: 'app.upload',
    filters: 'app.modal.filters',
    user: 'app.user',
    repository: 'app.modal.repository',
    noInternet: 'app.internet.connection',
}

export const DEFAULT_SCREENS_OPTIONS = readonly({
    headerBackTitleVisible: false,
    cardStyle: { backgroundColor: 'white' },
    headerStyle: {
        shadowColor: 'transparent',
    },
    headerTitleStyle: {
        fontFamily: stylesGuide.fonts.family.medium,
        fontSize: stylesGuide.utils.parseSize(stylesGuide.fonts.sizes.head),
    },
})