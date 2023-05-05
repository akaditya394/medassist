import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Checkbox from 'expo-checkbox'

import {
  StyledContainer,
  InnerContainer,
  UpperContainer,
  IconsContainer,
  PageTitle,
  Icon,
  StyledText,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  StyledCondition,
  ConditionsContainer,
  ConditionText,
  CheckboxContainer,
  MsgBox
} from "./styles";
import { Colors } from "../../shared/variables";

import SettingsImage from "../../images/icons/settings.svg";

const conditionsArray = [
  { id: "1", text: "Diabetes", value: "diabetes", isChecked: false },
  { id: "2", text: "High Blood pressure", value: "high_bp", isChecked: false },
  { id: "3", text: "Low Blood pressure", value: "low_bp", isChecked: false },
  { id: "4", text: "Respiratory Problems", value: "respiratory_problems", isChecked: false },
  { id: "5", text: "COVID 19", value: "covid", isChecked: false },
  { id: "6", text: "Allergies", value: "allergies", isChecked: false },
  { id: "7", text: "Migraine", value: "migraine", isChecked: false },
  { id: "8", text: "Gastrointestinal distress", value: "gastrointestinal_distress", isChecked: false },
  { id: "9", text: "Skin Problems", value: "skin_problems", isChecked: false },
  { id: "10", text: "Mental Health Problems", value: "mental_health_problems", isChecked: false }
]

const MedicalHistoryScreen = ({ navigation }) => {
  const [conditions, setConditions] = useState(conditionsArray)
  const [finalConditions, setFinalConditions] = useState([])

  const handleChange = (id) => {
    let temp = conditions.map((condition) => {
      if (id === condition.id) {
        return { ...condition, isChecked: !condition.isChecked }
      }
      return condition
    })
    setConditions(temp)
    let selected = temp.filter((condition) => condition.isChecked)
    setFinalConditions(selected)
  }

  const handleSubmit = () => {
    console.log(finalConditions)
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <UpperContainer>
          <PageTitle>Medical History</PageTitle>
          <IconsContainer>
            <Icon
              settings={true}
              onPress={() => navigation.navigate("Settings")}
            >
              <SettingsImage width="30px" height="30px" fill="#0F2E53" />
            </Icon>
          </IconsContainer>
        </UpperContainer>
        <StyledText>Please select your medical history</StyledText>
        <StyledFormArea>
          <ConditionsContainer>
            {conditions.map((condition, key) => {
              return (
                <StyledCondition key={key} onPress={() => handleChange(condition.id)}>
                  <ConditionText>{condition.text}</ConditionText>
                  <CheckboxContainer>
                    <Checkbox
                      value={condition.isChecked}
                      color={condition.isChecked ? `${Colors.primary}` : undefined}
                    />
                  </CheckboxContainer>
                </StyledCondition>
              );
            })}
          </ConditionsContainer>
        </StyledFormArea>
        <MsgBox>...</MsgBox>
        <StyledButton onPress={handleSubmit}>
          <ButtonText>Submit</ButtonText>
        </StyledButton>
        <Line />
      </InnerContainer>
    </StyledContainer>
  );
};

export default MedicalHistoryScreen;
