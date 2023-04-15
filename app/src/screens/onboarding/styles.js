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
`;

export const BottomContainer = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
    position: absolute;
    bottom: 0;
`;

export const PageTitle = styled.Text`
    font-size: 40px;
    text-align: left;
    color: ${Colors.primary};
    padding: 10px;
    font-weight: 700;
`;

export const Assist = styled.Text`
    font-size: 30px;
`;

export const SubTitle = styled.Text`
    font-size: 28px;
    padding: 10px;
    line-height: 40px;
    margin-bottom: 20px;
    letter-spacing: 0.5px;
    font-weight: 400;
    color: ${Colors.primary};
`;

export const StyledList = styled.FlatList`
    flex: 1;
    padding: 10px;
`;

export const StyledListItem = styled.Text`
    color: ${Colors.text};
    font-size: 17px;
    margin-bottom: 10px;
`;

export const StyledButton = styled.TouchableOpacity`
    width: 95%;
    padding: 15px;
    background-color: ${Colors.primary};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 60px;

    ${(props) => props.login == true && `
        background-color: ${Colors.secondary};
    `}
`;

export const ButtonText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 16px;

    ${(props) => props.login == true && `
        color: ${Colors.primary};
    `}
`;