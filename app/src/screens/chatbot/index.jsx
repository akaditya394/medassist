import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ToastAndroid, Platform, Alert } from 'react-native'

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
        } else if (Platform.OS === 'ios') {
            Alert.alert("Cannot send a empty message")
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
                            Hey, What do want to know?
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer isSender={true}>
                        <MessageText isSender={true}>
                            What are the ideal amount of glasses of water in a day
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer>
                        <MessageText>
                            Here are some tips to help you make sure you are drinking
                            enough fluids to maintain good levels of hydration. You
                            are probably all aware of the “cardinal rule” that says
                            adults should drink six to eight 8-ounce glasses of water
                            per day.
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer isSender={true}>
                        <MessageText isSender={true}>
                            Another thing, what is the first aid in case of a fracture
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer>
                        <MessageText>
                            Cool the affected area by applying and ice pack or ice
                            cubes wrapped in a clean cloth. Treat the patient's shock:
                            help them get into a comfortable position, encourage them
                            to rest, and reassure them. Cover them with a blanket or
                            clothing to keep them warm.
                        </MessageText>
                    </SingleMessageContainer>
                    <SingleMessageContainer isSender={true}>
                        <MessageText isSender={true}>
                            Thank you
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