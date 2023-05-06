import { StatusBar } from 'expo-status-bar'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    SelectImage,
    PrescriptionImage,
    Icon,
    PresriptionTitle,
    StyledButton,
    ButtonText,
    Line
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const handleDownload = async () => {
    let date = Date.now()
    const url = "https://images.pexels.com/photos/6381851/pexels-photo-6381851.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    let fileUri = FileSystem.documentDirectory + `${date}.jpg`
    try {
        const res = await FileSystem.downloadAsync(url, fileUri)
        saveFile(res.uri)
    } catch (err) {
        console.log("FS Err: ", err)
    }
}

const saveFile = async (fileUri) => {
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    const album = await MediaLibrary.getAlbumAsync('Download');
    if (album == null) {
        await MediaLibrary.createAlbumAsync('Download', asset, false);
    } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }
}

const UpdatedPrescriptionScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Updated Prescription
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <PresriptionTitle>Here is your updated prescription</PresriptionTitle>
                <SelectImage>
                    <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.jpg')} />
                </SelectImage>
                <Line />
                <StyledButton onPress={handleDownload}>
                    <ButtonText>Download</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UpdatedPrescriptionScreen