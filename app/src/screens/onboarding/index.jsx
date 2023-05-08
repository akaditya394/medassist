import React from 'react'
import { StatusBar } from "expo-status-bar"

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  Assist,
  StyledButton,
  ButtonText,
  BottomContainer,
  SubTitle,
  StyledList,
  StyledListItem,
  BlobContainer
} from "./styles"

import Blob1Image from '../../images/svg/blob_1.svg'
import Blob2Image from '../../images/svg/blob_2.svg'

const data = [
  { id: 1, text: "Upload prescriptions to see side-effects and alternatives to drugs" },
  { id: 2, text: "View personalized health chart accorign to your medical history" },
  { id: 3, text: "One to one consultation with trained medical professionals" },
]

const OnboardingScreen = ({ navigation }) => {

  return (
    <StyledContainer>
      <BlobContainer>
        <Blob1Image width="400px" height="400px" fill="#F5F6FB" />
      </BlobContainer>
      <BlobContainer blob2={true}>
        <Blob2Image width="400px" height="400px" fill="#F5F6FB" />
      </BlobContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <PageTitle>
          med<Assist>assist</Assist>
        </PageTitle>
        <SubTitle>A Simple way to help control your health</SubTitle>
        <StyledList
          data={data}
          renderItem={({ item }) => (
            <StyledListItem>{`\u2022 ${item.text}`}</StyledListItem>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <BottomContainer>
          <StyledButton onPress={() => navigation.navigate("SignUp")}>
            <ButtonText>Get Started</ButtonText>
          </StyledButton>
          <StyledButton login={true} onPress={() => navigation.navigate("Login")}>
            <ButtonText login={true}>Login</ButtonText>
          </StyledButton>
        </BottomContainer>
      </InnerContainer>
    </StyledContainer>
  )
}

export default OnboardingScreen
