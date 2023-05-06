import { StatusBar } from 'expo-status-bar'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    StyledText,
    PlanContainer,
    StyledButton,
    ButtonText,
    PlanPrice,
    PlanPriceSubText,
    PlanTextContainer,
    YearlyPrice
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const UpgradePlanScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Upgrade your Plan
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <StyledText>Choose your plan:</StyledText>
                <PlanContainer>
                    <PlanTextContainer>
                        <PlanPrice>$10<PlanPriceSubText>/Month</PlanPriceSubText></PlanPrice>
                        <YearlyPrice>$120/Year</YearlyPrice>
                    </PlanTextContainer>
                    <StyledButton onPress={() => { }}>
                        <ButtonText>Choose Plan</ButtonText>
                    </StyledButton>
                </PlanContainer>
                <PlanContainer yearly={true}>
                    <PlanTextContainer>
                        <PlanPrice>$10<PlanPriceSubText>/Month</PlanPriceSubText></PlanPrice>
                        <YearlyPrice>$120/Year</YearlyPrice>
                    </PlanTextContainer>
                    <StyledButton onPress={() => { }}>
                        <ButtonText>Choose Plan</ButtonText>
                    </StyledButton>
                </PlanContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UpgradePlanScreen