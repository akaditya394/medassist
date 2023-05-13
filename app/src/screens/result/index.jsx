import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, Text } from 'react-native'
import { DataTable } from 'react-native-paper'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    SelectImage,
    BottomContainer,
    StyledButton,
    ButtonText,
    PrescriptionImage,
    TableContainer,
    ScrollableContainer
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import { Colors } from '../../shared/variables'

const ResultScreen = ({ navigation }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        setData({
            "_id": "645fa16ef5027e9d7f606bb6",
            "name": "Vansh pres2",
            "isVerified": false,
            "image": "https://res.cloudinary.com/ddr0jey9k/image/upload/v1683988845/prescriptions/1683988829935.jpg",
            "drugs": [
                "STALOPAM",
                "STALOPAM",
                "STALOPAM",
                "STALOPAM"
            ],
            "alternatives": [],
            "suggestions": [],
            "sideEffects": [
                "Increased appetite",
                "Increased appetite",
                "Increased appetite",
                "Increased appetite"
            ],
            "user": "645f8be38438b15c858a618b",
            "doctor": [
                "645fce8b82b88074925c7ac7"
            ],
            "createdAt": "2023-05-13T14:40:46.208Z",
            "updatedAt": "2023-05-13T18:15:33.502Z",
            "__v": 0
        })
    }, [])

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Result
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <ScrollableContainer>
                    <SelectImage>
                        <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.jpg')} />
                    </SelectImage>
                    <TableContainer>
                        <DataTable>
                            <DataTable.Header style={{
                                height: 50, backgroundColor: `${Colors.tertiary}`
                            }}>
                                <DataTable.Title>Drug name</DataTable.Title>
                                <DataTable.Title>Side Effects</DataTable.Title>
                            </DataTable.Header>
                            {data?.drugs?.map((drug, index) => {
                                return (
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell>{drug}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <View style={{ width: 100, flexShrink: 1 }}>
                                                <Text style={{ textAlign: 'left' }}>{data?.sideEffects?.[index]}</Text>
                                            </View>
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })}
                        </DataTable>
                    </TableContainer>
                </ScrollableContainer>
                <BottomContainer>
                    <StyledButton onPress={() => navigation.navigate('AllResults')}>
                        <ButtonText>Continue</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default ResultScreen