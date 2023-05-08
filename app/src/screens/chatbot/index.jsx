import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ToastAndroid, Platform, AlertIOS } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    Line,
    PageTitle,
    MessagesArea,
    BottomContainer,
    IconsContainer,
    Icon,
    InputContainer,
    StyledTextInput,
    RightIcon,
    SingleMessageContainer,
    MessageText,
    SingleMessageWrapper
} from './styles'
import { Colors } from '../../shared/variables'

import SettingsImage from '../../images/icons/settings.svg'
import UploadImage from '../../images/icons/upload.svg'

const ChatbotScreen = ({ navigation }) => {
    const [message, setMessage] = useState('')

    const showToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(
                "Cannot send a empty message",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        } else {
            AlertIOS.alert("Cannot send a empty message")
        }
    }

    const handleSendMessage = () => {
        if (message === '') {
            showToast()
        } else {
            console.log('message is: ', message)
        }
    }

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Chatbot
                    </PageTitle>
                    <IconsContainer>
                        <Icon onPress={() => navigation.navigate('Upload')}>
                            <UploadImage width="26px" height="26px" fill="#fff" />
                        </Icon>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <MessagesArea>
                    <SingleMessageContainer>
                        <MessageText>
                            If you're looking for random paragraphs,
                            you've come to the right place. When a
                            random word or a random sentence isn't
                            quite enough, the next logical step is to
                            find a random paragraph. We created the Random
                            Paragraph Generator with you in mind. The process
                            is quite simple. Choose the number of random
                            paragraphs you'd like to see and click the button.
                            Your chosen number of paragraphs will instantly appear.
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer isSender={true}>
                        <MessageText isSender={true}>
                            If you're looking for random paragraphs,
                            you've come to the right place. When a
                            random word or a random sentence isn't
                            quite enough, the next logical step is to
                            find a random paragraph. We created the Random
                            Paragraph Generator with you in mind. The process
                            is quite simple. Choose the number of random
                            paragraphs you'd like to see and click the button.
                            Your chosen number of paragraphs will instantly appear.
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer>
                        <MessageText>
                            If you're looking for random paragraphs,
                            you've come to the right place. When a
                            random word or a random sentence isn't
                            quite enough, the next logical step is to
                            find a random paragraph. We created the Random
                            Paragraph Generator with you in mind. The process
                            is quite simple. Choose the number of random
                            paragraphs you'd like to see and click the button.
                            Your chosen number of paragraphs will instantly appear.
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer isSender={true}>
                        <MessageText isSender={true}>
                            If you're looking for random paragraphs,
                            you've come to the right place. When a
                            random word or a random sentence isn't
                            quite enough, the next logical step is to
                            find a random paragraph. We created the Random
                            Paragraph Generator with you in mind. The process
                            is quite simple. Choose the number of random
                            paragraphs you'd like to see and click the button.
                            Your chosen number of paragraphs will instantly appear.
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer>
                        <MessageText>
                            If you're looking for random paragraphs,
                            you've come to the right place. When a
                            random word or a random sentence isn't
                            quite enough, the next logical step is to
                            find a random paragraph. We created the Random
                            Paragraph Generator with you in mind. The process
                            is quite simple. Choose the number of random
                            paragraphs you'd like to see and click the button.
                            Your chosen number of paragraphs will instantly appear.
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer isSender={true}>
                        <MessageText isSender={true}>
                            If you're looking for random paragraphs,
                            you've come to the right place. When a
                            random word or a random sentence isn't
                            quite enough, the next logical step is to
                            find a random paragraph. We created the Random
                            Paragraph Generator with you in mind. The process
                            is quite simple. Choose the number of random
                            paragraphs you'd like to see and click the button.
                            Your chosen number of paragraphs will instantly appear.
                        </MessageText>
                    </SingleMessageContainer>
                </MessagesArea>
                <BottomContainer>
                    <InputContainer>
                        <StyledTextInput
                            onChangeText={(message) => setMessage(message)}
                            value={message}
                            keyboardType="default"
                        />
                        <RightIcon onPress={handleSendMessage}>
                            <Ionicons name='send' size={30} color={Colors.primary} />
                        </RightIcon>
                    </InputContainer>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default ChatbotScreen