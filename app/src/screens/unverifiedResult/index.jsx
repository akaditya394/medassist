import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, View, Text } from 'react-native'
import { DataTable } from 'react-native-paper'
import DropDownPicker from "react-native-dropdown-picker"
import axios from "axios"

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    Notice,
    StyledText,
    TableContainer,
    Line,
    ScrollableContainer,
    SelectImage,
    PrescriptionImage,
    InputContainer,
    StyledInputLabel,
    DropDownContainer
} from './styles'
import { Colors } from '../../shared/variables'

import { store } from '../../store'
import { apiURL } from '../../config/constants'

import SettingsImage from '../../images/icons/settings.svg'

const doctorData = [
    { id: "1", name: "nishank" },
    { id: "2", name: "rahul" },
    { id: "3", name: "naman" },
    { id: "4", name: "vansh" },
    { id: "3", name: "aditya" },
];

const UnverifiedResultScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const [doctorsListOpen, setDoctorsListOpen] = useState(false)
    const [doctorsListValue, setDoctorsListValue] = useState(null)
    const [doctorsListData, setDoctorsListData] = useState(doctorData)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getPrescription() {
            try {
                const token = store.getState().auth.token
                setIsLoading(true)
                const res = await axios.post(`${apiURL}/prescription/getSide`, JSON.stringify({
                    id: route.params.query.id,
                }),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                switch (res.data.type) {
                    case "success":
                        setIsLoading(false);
                        setData(res.data.prescriptions)
                        break
                    case "error":
                        setIsLoading(false)
                        console.log(res)
                        break
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        }
        route.params.query.id && getPrescription()
    }, [route.params.query])

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Unverified Result
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <InputContainer>
                    <StyledInputLabel>Choose a doctor to verify your prescription</StyledInputLabel>
                    <DropDownContainer>
                        <DropDownPicker
                            style={{
                                borderColor: "#F5F6FB",
                                backgroundColor: "#F5F6FB"
                            }}
                            open={doctorsListOpen}
                            value={doctorsListValue}
                            items={doctorsListData}
                            setOpen={setDoctorsListOpen}
                            setValue={setDoctorsListValue}
                            setItems={setDoctorsListData}
                            placeholder="Select Medical Council"
                            loading={loading}
                            activityIndicatorColor="#F5F6FB"
                            searchable={true}
                            searchPlaceholder="Search..."
                            onChangeValue={(doctorsListValue) => setDoctorsListValue(doctorsListValue)}
                            zIndex={1000}
                            zIndexInverse={3000}
                        />
                    </DropDownContainer>
                </InputContainer>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0F2E53" />
                ) : (
                    <>
                        <Notice>
                            <StyledText>
                                Your upload prescription has not yet been verified.
                            </StyledText>
                        </Notice>
                        <ScrollableContainer>
                            <SelectImage>
                                <PrescriptionImage resizeMode="cover" source={
                                    // require('../../images/test/prescription.jpg')
                                    data?.image
                                } />
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
                        <Line />
                        <StyledText>
                            Additonal info will be available as soon as your
                            precription gets verified
                        </StyledText>
                    </>
                )}
            </InnerContainer>
        </StyledContainer>
    )
}

export default UnverifiedResultScreen