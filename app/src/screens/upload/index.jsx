import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    Settings,
} from './styles'

const UploadScreen = ({ navigation }) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Upload
                    </PageTitle>
                    <Settings
                        resizeMode="cover"
                        source={require('../../images/icons/settings.png')}
                        onPress={() => navigation.navigate('Settings')}
                    />
                </UpperContainer>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Pick an image from camera roll" onPress={pickImage} />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UploadScreen