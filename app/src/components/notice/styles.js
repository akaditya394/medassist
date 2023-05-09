import styled from 'styled-components'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'

import { Colors } from '../../shared/variables'

export const StyledErrorContainer = styled.View`
    border: 1px solid ${Colors.error};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    border-radius: 5px;
    background-color: rgba(255, 0, 51, 0.1);
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const StyledErrorText = styled.Text`
    color: ${Colors.error};
    font-weight: 700;
    font-size: 16px;
`;

export const StyledSuccessContainer = styled.View`
    border: 1px solid ${Colors.success};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    border-radius: 5px;
    background-color: rgba(0, 255, 51, 0.09);
    margin-top: 5px;
    margin-bottom: 5px;
`;

export const StyledSuccessText = styled.Text`
    color: ${Colors.success};
    font-weight: 700;
    font-size: 16px;
`;