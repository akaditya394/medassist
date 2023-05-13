import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'

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
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: 13px;
`;

export const StyledFormArea = styled.View`
    width: 100%;
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

export const StyledTextInput = styled.TextInput`
    background-color: ${Colors.tertiary};
    padding: 15px;
    padding-left: 25px;
    padding-right: 25px;
    border-radius: 5px;
    font-size: 16px;
    height: 60px;
    margin-top: 3px;
    margin-bottom: 10px;
    color: ${Colors.primary};
`;

export const StyledInputLabel = styled.Text`
    color: ${Colors.primary};
    font-size: 13px;
    text-align: left;
`;

export const InputContainer = styled.View`
    width: 100%;
`;

export const DropDownContainer = styled.View`
    z-index: 1;
`;

export const BottomContainer = styled.View`
    width: 100%;
    position: absolute;
    bottom: 0;
`;