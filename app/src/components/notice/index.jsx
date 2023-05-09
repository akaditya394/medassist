import React from 'react'
import { StyledErrorContainer, StyledErrorText, StyledSuccessContainer, StyledSuccessText } from './styles'

const Notice = ({ children, status }) => {
    return (
        <>
            {(status === "ERROR") && (
                <StyledErrorContainer>
                    <StyledErrorText>{children}</StyledErrorText>
                </StyledErrorContainer>
            )}
            {(status === "SUCCESS") && (
                <StyledSuccessContainer>
                    <StyledSuccessText>{children}</StyledSuccessText>
                </StyledSuccessContainer>
            )}
        </>
    )
}

export default Notice