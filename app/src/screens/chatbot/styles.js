import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'

import { StatusBarHeight } from '../../shared/variables'
import { Colors } from '../../shared/variables'

export const StyledContainer = styled.View`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: #fff;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    position: relative;
`;

export const UpperContainer = styled.View`
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

export const PageTitle = styled.Text`
    font-size: 25px;
    color: ${Colors.primary};
    font-weight: 700;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${Colors.primary};
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const BottomContainer = styled.View`
    width: 100%;
    margin-top: 5px;
`;

export const IconsContainer = styled.View`
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: row;
`;

export const Icon = styled.TouchableOpacity`
    width: 37px;
    height: 37px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    background-color: ${Colors.primary};

    ${(props) => props.settings == true && `
        background-color: ${Colors.secondary};
        margin-right: 0px;
    `}
`;

export const InputContainer = styled.View`
    width: 100%;
    margin-top: 5px;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${Colors.tertiary};
    padding: 15px;
    padding-left: 25px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    color: ${Colors.primary};
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 15px;
    position: absolute;
    z-index: 1;
`;

export const MessagesArea = styled.ScrollView`
    width: 100%;
    border: 1px solid black;
`;

export const SingleMessageContainer = styled.View`
    width: 60%;
    background-color: ${Colors.tertiary};
    padding: 15px;
    border-radius: 2px;
    justify-content: center;
    margin-bottom: 10px;
    margin-left: 0; 
    margin-right: auto;

    ${(props) => props.isSender == true && `
        background-color: ${Colors.primary};
        margin-left: auto; 
        margin-right: 0;
    `}
`;

export const MessageText = styled.Text`
    font-size: 14px;
    color: ${Colors.text};

    ${(props) => props.isSender == true && `
        color: #fff;
    `}
`;