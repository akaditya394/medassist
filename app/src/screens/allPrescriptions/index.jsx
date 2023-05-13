import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import axios from 'axios'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    Settings,
    StyledList,
    StyledListItem,
    StyledListText
} from './styles'

import { store } from '../../store'
import Notice from '../../components/notice'
import { apiURL } from '../../config/contants'

import SettingsImage from '../../images/icons/settings.svg'

// const data = [
//     { id: 1, text: 'Prescription 1' },
//     { id: 2, text: 'Prescription 2' },
//     { id: 3, text: 'Prescription 3' },
// ]

const AllPrescriptionsScreen = ({ navigation }) => {
    const RESET_NOTICE = { type: "", message: "" }
    const [notice, setNotice] = useState(RESET_NOTICE)
    const [data, setData] = useState([])

    useEffect(() => {
        async function unverifiedPrescriptions() {
            try {
                const token = store.getState().auth.token
                // if (!token) {
                //   router.replace("/login");
                // }
                const res = await axios.get(`${apiURL}/doctor/unverifiedPrescriptions`, {
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
                // console.log(res, "ResPres");
                // setData([
                //   { id: 1, name: "my prescription", verified: true },
                //   { id: 2, name: "test prescription", verified: false },
                //   { id: 3, name: "Item 2", verified: false },
                //   { id: 4, name: "Item 3", verified: true },
                // ]);
            } catch (error) {
                setNotice({ type: "ERROR", message: error.response.data.message })
            }
        }
        unverifiedPrescriptions()
    }, [])

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Home
                    </PageTitle>
                    <Settings onPress={() => navigation.navigate('Settings')}>
                        <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                    </Settings>
                </UpperContainer>
                {notice.message && (
                    <Notice status={notice.type}>
                        {notice.message}
                    </Notice>
                )}
                <StyledList
                    data={data}
                    renderItem={({ item }) => (
                        <StyledListItem onPress={() => navigation.navigate("Prescription")}>
                            <StyledListText>{`${item.name}`}</StyledListText>
                        </StyledListItem>
                    )}
                    keyExtractor={(item) => item._id.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default AllPrescriptionsScreen