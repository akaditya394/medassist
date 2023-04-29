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

export const Close = styled.TouchableOpacity`
    width: 20px;
    height: 20px;
    background-color: ${Colors.tertiary};
`;

export const StyledFormArea = styled.ScrollView`
    width: 100%;
`;

export const StyledInputLabel = styled.Text`
    color: ${Colors.primary};
    font-size: 15px;
    text-align: left;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${Colors.secondary};
    border: ${Colors.primary};
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

export const StyledLabel = styled.Text`
    color: ${Colors.primary};
    font-size: 15px;
    text-align: left;
    margin-bottom: 10px;
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

export const StyledSideEffects = styled.View`
    background-color: ${Colors.tertiary};
    margin-top: 15px;
    padding: 15px;
    border-radius: 5px;
`;

export const StyledSideEffect = styled.View`
    border: ${Colors.primary};
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 15px;
`;

export const SideEffectText = styled.Text`
    color: ${Colors.text};
    font-size: 15px;
`;

export const DropDownContainer = styled.View`
    z-index: 1;
`;

export const TextInputContainer = styled.View`
    width: 100%;
    margin-top: 10px;
`;