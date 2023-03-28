import React, { useState } from 'react'
import { StatusBar } from "expo-status-bar";
import Spinner from 'react-native-loading-spinner-overlay'

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
} from "./styles";

const data = [
  { id: 1, text: "Upload prescriptions to see side-effects and alternatives to drugs" },
  { id: 2, text: "View personalized health chart accorign to your medical history" },
  { id: 3, text: "One to one consultation with trained medical professionals" },
];

const OnboardingScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <Spinner
          visible={loading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
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
          <StyledButton onPress={() => navigation.navigate("MedicalHistory")}>
            <ButtonText>Get Started</ButtonText>
          </StyledButton>
        </BottomContainer>
      </InnerContainer>
    </StyledContainer>
  );
};

export default OnboardingScreen;
