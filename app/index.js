import { LogBox } from "react-native"
import { registerRootComponent } from "expo"
import App from "./src/App"

registerRootComponent(App)
LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell`'])