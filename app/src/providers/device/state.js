import { Appearance } from 'react-native'
import { readonly } from '../../helpers/readonly'

export const deviceSettingsInitialState = readonly({
    appearance: {
        isDarkMode: Appearance.getColorScheme() === 'dark',
    },
    network: {
        isConnected: true,
    },
})