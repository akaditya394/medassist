import { useState } from "react";
import { ToastAndroid, Platform, Alert, ActivityIndicator } from 'react-native'
import { StatusBar } from "expo-status-bar";
import Checkbox from 'expo-checkbox'
import axios from "axios"

import {
  StyledContainer,
  InnerContainer,
  UpperContainer,
  PageTitle,
  StyledText,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  StyledCondition,
  ConditionsContainer,
  ConditionText,
  CheckboxContainer,
  MsgBox,
  InputContainer,
  StyledInputLabel,
  StyledTextInput
} from "./styles";
import { Colors } from "../../shared/variables";

import { store } from '../../store'
import KeyboardAvoidingWrapper from '../../components/keyboardAvoidingWrapper'
import Notice from "../../components/notice";
import { apiURL } from '../../config/constants'

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
  { id: "10", text: "Mental Health Problems", value: "mental_health_problems", isChecked: false },
  { id: "11", text: "Other", value: "other", isChecked: false }
]

const MedicalHistoryScreen = ({ navigation }) => {
  const RESET_NOTICE = { type: "", message: "" }
  const [notice, setNotice] = useState(RESET_NOTICE)
  const [isLoading, setIsLoading] = useState(false)
  const [conditions, setConditions] = useState(conditionsArray)
  const [finalConditions, setFinalConditions] = useState([])
  const [otherCondition, setOtherCondition] = useState('')

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

  const otherMedicalHistoryChecker = (item) => {
    return item.text === "Other"
  }

  const showToast = () => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(
        "You need to select atleast one checkbox",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      )
    } else if (Platform.OS === 'ios') {
      Alert.alert("You need to select atleast one checkbox")
    }
  }

  const handleSubmit = async () => {
    if (finalConditions.length === 0) {
      setNotice({ type: "", message: "" })
      showToast()
    } else {
      setIsLoading(true)
      // a http post request to submit
      try {
        const token = store.getState().auth.token
        const res = await axios.post(`${apiURL}/user/addMedicalHistory`,
          {
            one: finalConditions,
            two: otherCondition,
          },
          {
            "headers": {
              "content-type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setIsLoading(false)
        switch (res?.data?.type) {
          case "success":
            setTimeout(() => {
              navigation.replace("AllResults")
            }, 3000)
            setNotice({ type: "SUCCESS", message: res.data.message })
            break
          case "error":
            setNotice({ type: "ERROR", message: res.data.message })
            break
        }
      } catch (error) {
        setIsLoading(false)
        setNotice({ type: "ERROR", message: error.response.data.message })
      }
    }
  }

  return (
    <StyledContainer>
      <StatusBar style="dark" />
      {/* <KeyboardAvoidingWrapper> */}
      <InnerContainer>
        <UpperContainer>
          <PageTitle>Medical History</PageTitle>
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
          <>
            {conditions.find(otherMedicalHistoryChecker).isChecked && (
              <InputContainer>
                <StyledInputLabel>Type your medical history:</StyledInputLabel>
                <StyledTextInput
                  onChangeText={(otherCondition) => setOtherCondition(otherCondition)}
                  value={otherCondition}
                  keyboardType="default"
                />
              </InputContainer>
            )}
          </>
        </StyledFormArea>
        <MsgBox>...</MsgBox>
        {notice.message && (
          <Notice status={notice.type}>
            {notice.message}
          </Notice>
        )}
        {!isLoading ? (
          <StyledButton onPress={handleSubmit}>
            <ButtonText>Submit</ButtonText>
          </StyledButton>
        ) : (
          <StyledButton disable={true}>
            <ActivityIndicator size="large" color="#fff" />
          </StyledButton>
        )}
        <Line />
      </InnerContainer>
      {/* </KeyboardAvoidingWrapper> */}
    </StyledContainer>
  );
};

export default MedicalHistoryScreen;
