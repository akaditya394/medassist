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

export const Notice = styled.View`
    background-color: ${Colors.tertiary};
    margin-bottom: 15px;
    padding: 15px;
    border-radius: 5px;
`;

export const StyledText = styled.Text`
    color: ${Colors.primary};
    font-size: 16px;
    font-weight: 500;
`;

export const ListTitle = styled.Text`
    font-size: 22px;
    color: ${Colors.primary};
    font-weight: 500;
    padding-left: 15px;
    margin-bottom: 10px;
`;

export const StyledListItem = styled.View`
    margin-bottom: 15px;
    padding-left: 15px;
`;

export const StyledListText = styled.Text`
    color: ${Colors.primary};
    font-size: 17px;
    font-weight: 500;
`;

export const StyledListReview = styled.Text`
    color: ${Colors.text};
    font-size: 14px;
    margin-left: 15px;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 15px;
    background-color: ${Colors.primary};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-top: 5px;
    height: 60px;
`;

export const ButtonText = styled.Text`
    color: white;
    font-weight: 700;
    font-size: 16px;
`;

export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${Colors.primary};
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const TableContainer = styled.View`
    width: 100%;
    background-color: white;
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
`;