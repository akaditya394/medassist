import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker'
import { ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
import axios from 'axios'

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

import { store } from '../../store'
import Notice from '../../components/notice'
import { apiURL } from '../../config/constants'

import DefaultImage from '../../images/icons/default_image.svg'
import SettingsImage from '../../images/icons/settings.svg'

const UploadScreen = ({ navigation }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null)
    const [image, setImage] = useState(null)
    const [imageName, setImageName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

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
            setNotice({ type: "", message: "" })
            showToast()
        } else {
            setIsLoading(true)
            // a http post request to upload prescription
            try {
                const token = store.getState().auth.token
                const res = await axios.post(`${apiURL}/prescription/uploadPrescription`, {
                    file: image, name: imageName
                }, {
                    "headers": {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                })
                switch (res.data.type) {
                    case "success":
                        setNotice({ type: "SUCCESS", message: res.data.message })
                        break
                    case "error":
                        setNotice({ type: "ERROR", message: res.data.message })
                        break
                }
            } catch (error) {
                setIsLoading(false)
                setNotice({ type: "ERROR", message: error.response.data.message })
            }
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
                {notice.message && (
                    <Notice status={notice.type}>
                        {notice.message}
                    </Notice>
                )}
                <BottomContainer>
                    <StyledButton onPress={() => pickImage()}>
                        <ButtonText>Pick an image from camera roll</ButtonText>
                    </StyledButton>
                    {!isLoading ? (
                        <StyledButton upload={true} onPress={handleSubmit}>
                            <ButtonText upload={true}>Upload</ButtonText>
                        </StyledButton>
                    ) : (
                        <StyledButton upload={true} disable={true}>
                            <ActivityIndicator size="large" color="#0F2E53" />
                        </StyledButton>
                    )}
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UploadScreen