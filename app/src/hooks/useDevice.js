import { useContext } from 'react'
import { DeviceContext } from '../providers/device'

// Provides device settings to the whole application, 
// appearance, internet connection, and other stuff...
// Use for styles, adapt components to the default theme, or avoid 
// API calls when you don't have internet.
export const useDevice = () => useContext(DeviceContext)