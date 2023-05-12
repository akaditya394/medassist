import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'

import { Colors, StatusBarHeight } from '../../shared/variables'

export const StyledContainer = styled.ScrollView`
    flex: 1;
    padding: 25px;
    padding-top: ${StatusBarHeight + 10}px;
    background-color: #fff;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
`;

export const UpperContainer = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

export const PageTitle = styled.Text`
    font-size: 25px;
    color: ${Colors.primary};
    font-weight: 700;
`;

export const StyledText = styled.Text`
    color: ${Colors.primary};
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 15px;
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