import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, SectionList } from 'react-native'

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

export const PageTitle = styled.Text`
    font-size: 30px;
    text-align: left;
    color: ${Colors.primary};
    padding: 10px;
    font-weight: 700;
`;

export const StyledList = styled.SectionList`
    margin: 0px;
`;

export const StyledHeader = styled.Text`
    padding-top: 2px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 2px;
    font-size: 14px;
    font-weight: bold;
    background-color: ${Colors.secondary};
    color: ${Colors.primary};
`;

export const StyledItem = styled.View`
    padding: 10px;
    margin-bottom: 5px;
`;

export const StyledText = styled.Text`
    color: ${Colors.text};
    font-size: 18px;
`;