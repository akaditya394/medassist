import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Text, ScrollView, ActivityIndicator, View } from 'react-native'
import { DataTable } from 'react-native-paper'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    Notice,
    StyledText,
    ListTitle,
    StyledButton,
    ButtonText,
    Line,
    TableContainer,
    ScrollableContainer,
    SelectImage,
    PrescriptionImage
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import { Colors } from '../../shared/variables'

const VerifiedResultScreen = ({ navigation, route }) => {
    const id = route.params.query.id
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Verified Result
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0F2E53" />
                ) : (
                    <>
                        <Notice>
                            <StyledText>
                                Your upload prescription has been verified by{' '}
                                <Text style={{ fontWeight: 'bold' }}>Dr. Puneet Sharma</Text>
                                , a trained medical professional.
                            </StyledText>
                        </Notice>
                        <ScrollableContainer>
                            <SelectImage>
                                <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.jpg')} />
                            </SelectImage>
                            <ListTitle>Drugs' alternatives and suggestions:</ListTitle>
                            <TableContainer>
                                <ScrollView horizontal>
                                    <DataTable>
                                        <DataTable.Header style={{
                                            height: 50, backgroundColor: `${Colors.tertiary}`
                                        }}>
                                            <DataTable.Title>Drug name</DataTable.Title>
                                            <DataTable.Title>Side Effects</DataTable.Title>
                                            <DataTable.Title>Alternatives</DataTable.Title>
                                            <DataTable.Title>Suggestions</DataTable.Title>
                                        </DataTable.Header>
                                        {data?.drugs?.map((drug, index) => {
                                            return (
                                                <DataTable.Row key={index}>
                                                    <DataTable.Cell>{drug}</DataTable.Cell>
                                                    <DataTable.Cell>
                                                        <View style={{ width: 100, flexShrink: 1 }}>
                                                            <Text style={{ textAlign: 'center' }}>{data?.sideEffects?.[index]}</Text>
                                                        </View>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>
                                                        <View style={{ width: 100, flexShrink: 1 }}>
                                                            <Text style={{ textAlign: 'center' }}>{data?.alternatives?.[index]}</Text>
                                                        </View>
                                                    </DataTable.Cell>
                                                    <DataTable.Cell>
                                                        <View style={{ width: 100, flexShrink: 1 }}>
                                                            <Text style={{ textAlign: 'center' }}>{data?.suggestions?.[index]}</Text>
                                                        </View>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            )
                                        })}
                                    </DataTable>
                                </ScrollView>
                            </TableContainer>
                        </ScrollableContainer>
                        <Line />
                        <StyledButton onPress={() => navigation.goBack()}>
                            <ButtonText>Continue</ButtonText>
                        </StyledButton>
                    </>
                )}
            </InnerContainer>
        </StyledContainer>
    )
}

export default VerifiedResultScreen