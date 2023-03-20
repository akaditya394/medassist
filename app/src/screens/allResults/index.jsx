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
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import VerifiedImage from '../../images/icons/verified.svg'
import UploadImage from '../../images/icons/upload.svg'

const data = [
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
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
                        <Icon onPress={() => navigation.navigate('Upload')}>
                            <UploadImage width="26px" height="26px" fill="#fff" />
                        </Icon>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <StyledList
                    data={data}
                    renderItem={({ item }) => (
                        <StyledListItem>
                            <StyledListText>{`${item.text}`}</StyledListText>
                            <Verified>
                                <VerifiedImage width="30px" height="30px" fill="#0F2E53" />
                            </Verified>
                        </StyledListItem>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </InnerContainer>
        </StyledContainer>
    )
}

export default AllResultsScreen