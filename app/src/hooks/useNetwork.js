import { useEffect, useState } from 'react'
import Net from '@react-native-community/netinfo'

// Allows you to get information about connection type and connection quality.
export const useNetwork = () => {
    const [isConnected, setConnection] = useState(true)

    useEffect(() => {
        const sub = Net.addEventListener(({ isConnected: c }) => setConnection(c))

        return () => {
            sub()
        }
    }, [isConnected])

    return { isConnected }
}