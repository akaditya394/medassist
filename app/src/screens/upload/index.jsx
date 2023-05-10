import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import { ToastAndroid, Platform, Alert } from 'react-native'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    Settings,
    StyledButton,
    ButtonText,
    StyledImage,
    SelectImage,
    StyledText,
    BottomContainer,
    TextInputContainer,
    StyledInputLabel,
    StyledTextInput
} from './styles'

import DefaultImage from '../../images/icons/default_image.svg'
import SettingsImage from '../../images/icons/settings.svg'

const UploadScreen = ({ navigation }) => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState('')

    useEffect(() => {
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status === 'granted')
        })()
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    if (hasGalleryPermission === false) {
        return (
            <StyledContainer>
                <StatusBar style='dark' />
                <InnerContainer>
                    <UpperContainer>
                        <PageTitle>
                            Upload
                        </PageTitle>
                        <Settings onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Settings>
                    </UpperContainer>
                    <StyledText>No access to internal Storage</StyledText>
                </InnerContainer>
            </StyledContainer>
        )
    }

    const showToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(
                "You need to fill the name of your prescription and upload it",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            )
        } else if (Platform.OS === 'ios') {
            Alert.alert("You need to fill the name of your prescription and upload it")
        }
    }

    const handleSubmit = async () => {
        if (imageName === '' || image === null) {
            showToast()
        } else {
            console.log('name of image is: ', imageName)
            console.log('Image is', image)
        }
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Upload
                    </PageTitle>
                    <Settings onPress={() => navigation.navigate('Settings')}>
                        <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                    </Settings>
                </UpperContainer>
                <TextInputContainer>
                    <StyledInputLabel>Write the name of your prescription:</StyledInputLabel>
                    <StyledTextInput
                        onChangeText={(imageName) => setImageName(imageName)}
                        value={imageName}
                        keyboardType="email-address"
                    />
                </TextInputContainer>
                {!image ? (
                    <SelectImage>
                        <DefaultImage width={200} height={200} fill="#0F2E53" opacity="0.5" />
                        <StyledText>Selected image will appear here</StyledText>
                    </SelectImage>
                ) : (
                    <SelectImage>
                        <StyledImage source={{ uri: image }} />
                    </SelectImage>
                )}
                <BottomContainer>
                    <StyledButton onPress={() => pickImage()}>
                        <ButtonText>Pick an image from camera roll</ButtonText>
                    </StyledButton>
                    <StyledButton upload={true} onPress={
                        handleSubmit
                        // () => navigation.navigate('Result')
                    }>
                        <ButtonText upload={true}>Upload</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UploadScreen