import { React } from 'react'
import { StatusBar } from 'expo-status-bar'

import { StyledContainer, InnnerContainer, PageLogo, PageTitle, Assist, SubTitle } from './styles'

const LoginScreen = () => {
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnnerContainer>
                <PageLogo resizeMode="cover" source={require('../../images/logo/logo.png')} />
                <PageTitle>
                    med<Assist>Assist</Assist>
                </PageTitle>
                <SubTitle>Account login</SubTitle>
            </InnnerContainer>
        </StyledContainer>
    )
}

export default LoginScreen