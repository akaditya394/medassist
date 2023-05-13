import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ToastAndroid, Platform, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'

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
} from './styles'
import { Colors } from '../../shared/variables'

import Notice from '../../components/notice'
import { apiURL } from '../../config/constants'

import SettingsImage from '../../images/icons/settings.svg'
import UploadImage from '../../images/icons/upload.svg'

const myMessages = [
    {
        id: 1,
        text: "Hey, What do want to know?",
        fromSelf: false,
    },
    {
        id: 2,
        text: "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough.",
        fromSelf: true,
    },
    {
        id: 3,
        text: "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough.",
        fromSelf: false,
    },
    {
        id: 4,
        text: "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough.",
        fromSelf: true,
    },
    {
        id: 5,
        text: "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough.",
        fromSelf: false,
    },
    {
        id: 6,
        text: "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough.",
        fromSelf: true,
    },
    {
        id: 7,
        text: "If you're looking for random paragraphs, you've come to the right place. When a random word or a random sentence isn't quite enough.",
        fromSelf: true,
    },
];

const ChatbotScreen = ({ navigation }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [value, setValue] = useState("")
    const [messages, setMessages] = useState([])

    const showToast = () => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(
                "Cannot send an empty message",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        } else if (Platform.OS === 'ios') {
            Alert.alert("Cannot send an empty message")
        }
    }

    const handleSendMessage = async (value) => {
        if (value === '') {
            showToast()
        } else {
            setMessages((prev) => [
                ...prev,
                { id: prev.length + 1, text: value, fromSelf: true },
            ])
            setValue("")
            try {
                const res = await axios.post(`${apiURL}/chat`, { value })
                setMessages((prev) => [
                    ...prev,
                    { id: prev.length + 1, text: res.data.result, fromSelf: false },
                ])
            } catch (error) {
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
                    {messages.map((item, index) => {
                        return (
                            <SingleMessageContainer key={index} isSender={item.fromSelf}>
                                <MessageText isSender={item.fromSelf}>
                                    {item.text}
                                </MessageText>
                            </SingleMessageContainer>
                        )
                    })}
                </MessagesArea>
                <Line />
                <BottomContainer>
                    {notice.message && (
                        <Notice status={notice.type}>
                            {notice.message}
                        </Notice>
                    )}
                    <InputContainer>
                        <StyledTextInput
                            onChangeText={(text) => setValue(text)}
                            value={value}
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