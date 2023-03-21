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

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: left;
    color: ${Colors.primary};
    padding: 10px;
    font-weight: 700;
`;

export const ListTitle = styled.Text`
    font-size: 22px;
    color: ${Colors.primary};
    font-weight: 500;
    padding-left: 15px;
    margin-bottom: 10px;
`;

export const StyledList = styled.FlatList`
    margin-bottom: 15px;
`;

export const StyledListItem = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    margin-bottom: 15px;
    padding-left: 15px;
`;

export const StyledListText = styled.Text`
    color: ${Colors.primary};
    font-size: 17px;
    margin-right: 5px;
`;

export const Verified = styled.View`
    width: auto;
    height: auto;
`;