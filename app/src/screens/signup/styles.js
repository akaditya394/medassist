import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'

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
    align-items: center;
`;

export const Logo = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: center;
    color: ${Colors.primary};
    padding: 10px;
    font-weight: 700;
`;

export const Assist = styled.Text`
    font-size: 25px;
`;

export const SubTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${Colors.text};
`;

export const StyledFormArea = styled.ScrollView`
    width: 90%;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${Colors.tertiary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: ${Colors.primary};

    ${(props) => props.isUser == true && `
        padding-left: 25px;
        padding-right: 25px;
    `}
`;

export const StyledInputLabel = styled.Text`
    color: ${Colors.primary};
    font-size: 13px;
    text-align: left;
`;

export const StyledRoleSelector = styled.View`
    width: 80%;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 38px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${Colors.primary};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
    height: 60px;
`;

export const ButtonText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 16px;
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${Colors.primary};
    margin-top: 10px;
`;

export const StyledText = styled.Text`
    color: ${Colors.primary};
    font-size: 16px;
    font-weight: 500;
`;