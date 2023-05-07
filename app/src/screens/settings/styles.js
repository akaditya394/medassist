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
    width: 100%;
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

export const StyledListItem = styled.TouchableOpacity`
    padding-left: 15px;
    padding-right: 15px;
`;

export const StyledListText = styled.Text`
    color: ${Colors.primary};
    font-size: 18px;
    font-weight: 500;
`;

export const RenewalDate = styled.Text`
    color: ${Colors.text};
    font-size: 14px;
    font-weight: 500;
`;

export const Link = styled.View`
    width: auto;
    height: auto;
`;

export const StyledDevTeamListItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-top: 15px;
    padding-left: 15px;
`;

export const StyledDevTeamListText = styled.Text`
    color: ${Colors.primary};
    font-size: 15px;
    font-weight: 500;
    margin-right: 5px;
`;

export const StyledDevListText = styled.Text`
    color: ${Colors.primary};
    font-size: 18px;
    font-weight: 500;
    padding-left: 15px;
    padding-right: 15px;
`;