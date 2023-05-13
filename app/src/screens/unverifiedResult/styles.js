import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native'

import { Colors, StatusBarHeight } from '../../shared/variables'

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
    margin-top: 20px;
`;

export const ScrollableContainer = styled.ScrollView`
    width: 100%;
`;

export const SelectImage = styled.View`
    display: flex;
    align-items: center;
    justify-content: center; 
    border: 1px solid ${Colors.primary};
    border-radius: 5px;
`;

export const PrescriptionImage = styled.Image`
    width: 100%;
    height: 500px;
`;

export const InputContainer = styled.View`
    width: 100%;
`;

export const StyledInputLabel = styled.Text`
    color: ${Colors.primary};
    font-size: 13px;
    text-align: left;
`;

export const DropDownContainer = styled.View`
    z-index: 1;
`;