import React, { useState, useEffect, createContext, useMemo } from 'react'
import { useColorScheme } from 'react-native'

import { deviceSettingsInitialState } from './state'
import { useNetwork } from '../../hooks/useNetwork'

export const DeviceContext = createContext(
    deviceSettingsInitialState
)

// Provides device settings to the whole application, appearance, 
// internet connection, and other stuff...
export const DeviceProvider = (props, { children }) => {
    const [data, setData] = useState(deviceSettingsInitialState)
    const { isConnected } = useNetwork()
    const scheme = useColorScheme()

    useEffect(() => {
        const appearance = { isDarkMode: scheme === 'dark' }

        setData(state => ({
            ...state,
            network: { isConnected },
            appearance,
        }))
    }, [isConnected, scheme])

    return (
        <DeviceContext.Provider
            value={useMemo(() => data, [isConnected])}
            {...props}
        >
            {children}
        </DeviceContext.Provider>
    )
}