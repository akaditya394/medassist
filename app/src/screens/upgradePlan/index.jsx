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
    YearlyPrice,
    BilledText,
    StyledFeature,
    FeatureText,
    MostPopularText,
    MostPopularContainer
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const yearlyData = [
    { id: "1", text: "Billing will be done once a year" },
    { id: "2", text: "Unlimited access to medassist platform" },
]

const monthlyData = [
    { id: "1", text: "Billing will be done once every month" },
    { id: "2", text: "Unlimited access to medassist platform" },
]

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
                    <MostPopularContainer>
                        <MostPopularText>most popular plan</MostPopularText>
                    </MostPopularContainer>
                    <PlanTextContainer>
                        <PlanPrice>$10<PlanPriceSubText>/Month</PlanPriceSubText></PlanPrice>
                        <YearlyPrice>$120/Year</YearlyPrice>
                    </PlanTextContainer>
                    <BilledText>billed yearly</BilledText>
                    {yearlyData.map((item, key) => {
                        return (
                            <StyledFeature key={key}>
                                <FeatureText>{`\u2022 ${item.text}`}</FeatureText>
                            </StyledFeature>
                        );
                    })}
                    <StyledButton onPress={() => navigation.navigate('Payment')}>
                        <ButtonText>Choose Plan</ButtonText>
                    </StyledButton>
                </PlanContainer>
                <PlanContainer monthly={true}>
                    <PlanTextContainer>
                        <PlanPrice>$12<PlanPriceSubText>/Month</PlanPriceSubText></PlanPrice>
                        <YearlyPrice>$144/Year</YearlyPrice>
                    </PlanTextContainer>
                    <BilledText>billed monthly</BilledText>
                    {monthlyData.map((item, key) => {
                        return (
                            <StyledFeature key={key}>
                                <FeatureText>{`\u2022 ${item.text}`}</FeatureText>
                            </StyledFeature>
                        );
                    })}
                    <StyledButton onPress={() => { }}>
                        <ButtonText>Choose Plan</ButtonText>
                    </StyledButton>
                </PlanContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default UpgradePlanScreen