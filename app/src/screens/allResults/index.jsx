import { StatusBar } from 'expo-status-bar'

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

import SettingsImage from '../../images/icons/settings.svg'
import VerifiedImage from '../../images/icons/verified.svg'
import UploadImage from '../../images/icons/upload.svg'

const data = [
    { id: 1, name: 'My Prescription', verified: true },
    { id: 2, name: 'Prescription 1', verified: false },
    { id: 3, name: 'Prescription 2', verified: true },
    { id: 4, name: 'Prescription 2', verified: true },
    { id: 5, name: 'Prescription 2', verified: true },
]

const AllResultsScreen = ({ navigation }) => {
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
                            <Icon onPress={() => navigation.navigate('MedicalHistory')}>
                                <UploadImage width="26px" height="26px" fill="#fff" />
                            </Icon>
                        )}
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <StyledList
                    data={data}
                    renderItem={({ item }) => (
                        <>
                            {item.verified ? (
                                <StyledListItem onPress={() => navigation.navigate("VerifiedResult")}>
                                    <StyledListText>{`${item.name}`}</StyledListText>
                                    <Verified>
                                        <VerifiedImage width="25px" height="25px" fill="#0F2E53" />
                                    </Verified>
                                </StyledListItem>
                            ) : (
                                <StyledListItem onPress={() => navigation.navigate("UnverifiedResult")}>
                                    <StyledListText>{`${item.name}`}</StyledListText>
                                </StyledListItem>
                            )}
                        </>
                    )}
                    keyExtractor={(item) => item.id.toString()}
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