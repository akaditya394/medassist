import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    StyledList,
    StyledListItem,
    StyledListText,
    Verified,
    Line,
    BottomContainer,
    StyledButton,
    ButtonText,
    StyledText
} from './styles'

import { store } from '../../store'
import Notice from '../../components/notice'
import { apiURL } from '../../config/contants'

import SettingsImage from '../../images/icons/settings.svg'
import VerifiedImage from '../../images/icons/verified.svg'
import UploadImage from '../../images/icons/upload.svg'

// const data = [
//     { id: 1, name: 'Prescription 1', verified: true },
//     { id: 2, name: 'Prescription 2', verified: false },
//     { id: 3, name: 'Prescription 3', verified: true },
//     { id: 4, name: 'Prescription 4', verified: true },
//     // { id: 5, name: 'Prescription 5', verified: true },
// ]

const AllResultsScreen = ({ navigation }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [data, setData] = useState([])

    useEffect(() => {
        async function prescriptions() {
            try {
                const token = store.getState().auth.token
                const res = await axios.get(`${apiURL}/prescription/allPrescriptions`, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                })

                switch (res.data.type) {
                    case "success":
                        setData(res.data.prescriptions)
                        break
                    case "error":
                        setNotice({ type: "ERROR", message: res.data.message })
                        break
                }
                // console.log(res, "ResPres")
                // setData([
                //   { id: 1, name: "my prescription", verified: true },
                //   { id: 2, name: "test prescription", verified: false },
                //   { id: 3, name: "Item 2", verified: false },
                //   { id: 4, name: "Item 3", verified: true },
                // ])
            } catch (error) {
                setNotice({ type: "ERROR", message: error.response.data.message })
            }
        }
        prescriptions()
    }, [])

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Home
                    </PageTitle>
                    <IconsContainer>
                        {data.length < 5 && (
                            <Icon onPress={() => navigation.navigate('Upload')}>
                                <UploadImage width="26px" height="26px" fill="#fff" />
                            </Icon>
                        )}
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                {data.length === 0 ? (
                    <StyledText>Your uploaded prescriptions will be visible here</StyledText>
                ) : (
                    <>
                        {notice.message && (
                            <Notice status={notice.type}>
                                {notice.message}
                            </Notice>
                        )}
                    </>
                )}
                <StyledList
                    data={data}
                    renderItem={({ item }) => (
                        <StyledListItem onPress={() => navigation.navigate(
                            item.isVerified ? "VerifiedResult" : "UnverifiedResult", {
                            query: { id: `${data._id}` }
                        }
                        )}>
                            <StyledListText>{`${item.name}`}</StyledListText>
                            {item.isVerified && (
                                <Verified>
                                    <VerifiedImage width="25px" height="25px" fill="#0F2E53" />
                                </Verified>
                            )}
                        </StyledListItem>
                    )}
                    keyExtractor={(item) => item._id.toString()}
                />
                {data.length >= 5 && (
                    <>
                        <Line />
                        <BottomContainer>
                            <StyledText>To continue using medassist, upgrade your plan</StyledText>
                            <StyledButton onPress={() => navigation.navigate("UpgradePlan")}>
                                <ButtonText>Upgrade Plan</ButtonText>
                            </StyledButton>
                        </BottomContainer>
                    </>
                )}
            </InnerContainer>
        </StyledContainer>
    )
}

export default AllResultsScreen