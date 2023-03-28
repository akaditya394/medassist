import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import CheckBox from "expo-checkbox";
// import { FormItem } from "react-native-form-component";

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
  StyledInputLabel,
  StyledCheckbox,
  ConditionsContainer,
} from "./styles";
import { Colors } from "../../shared/variables";

import SettingsImage from "../../images/icons/settings.svg";

const conditionsArray = [
  {
    id: "1",
    text: "Condition 1",
    value: "",
  },
  {
    id: "2",
    text: "Condition 3",
    value: "",
  },
  {
    id: "3",
    text: "Condition 4",
    value: "",
  },
  {
    id: "4",
    text: "Condition 5",
    value: "",
  },
  {
    id: "5",
    text: "Condition 6",
    value: "",
  },
  {
    id: "6",
    text: "Condition 7",
    value: "",
  },
  {
    id: "7",
    text: "Condition 8",
    value: "",
  },
  {
    id: "8",
    text: "Condition 9",
    value: "",
  },
  {
    id: "9",
    text: "Condition 10",
    value: "",
  },
  {
    id: "10",
    text: "Condition 11",
    value: "",
  },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MedicalHistoryScreen = ({ navigation }) => {
  const [conditions, setConditions] = useState([]);

  const handleCheckBox = (condition, isChecked) => {
    if (isChecked) {
      // add the condition to the array
      setConditions([...conditions, condition]);
    } else {
      // remove the condition from the array
      setConditions(conditions.filter((c) => c !== condition));
    }
  };

  const handleSubmit = () => {
    console.log("Conditions:", conditions);
  };

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
        {/* <Formik
          initialValues={{
            conditions: [],
          }}
          onSubmit={async (values, { resetForm }) => {
            await sleep(500);
            console.log(values);
          }}
        >
          {({ handleChange, handleSubmit, values, setFieldValue }) => (
            <StyledFormArea>
              <ConditionsContainer>
                {conditionsArray.map((condition, key) => {
                  return (
                    <CheckboxComponent
                      key={key}
                      value={condition.value}
                      onValueChange={(nextValue) =>
                        setFieldValue(conditions, nextValue)
                      }
                      label={condition.text}
                      name="conditions"
                    />
                  );
                })}
              </ConditionsContainer>

              <Line />
              <StyledButton onPress={handleSubmit} title="Submit">
                <ButtonText>Submit</ButtonText>
              </StyledButton>
            </StyledFormArea>
          )}
        </Formik> */}
        {/* <Form></Form> */}
        <StyledFormArea>
          <ConditionsContainer>
            {conditionsArray.map((condition, key) => {
              return (
                <CheckboxComponent
                  key={key}
                  value={conditions.includes(condition.text)}
                  onValueChange={(isChecked) =>
                    handleCheckBox(condition.text, isChecked)
                  }
                  label={condition.text}
                  name="conditions"
                />
              );
            })}
          </ConditionsContainer>

          <Line />
          <StyledButton onPress={handleSubmit} title="Submit">
            <ButtonText>Submit</ButtonText>
          </StyledButton>
        </StyledFormArea>
      </InnerContainer>
    </StyledContainer>
  );
};

const CheckboxComponent = ({ label, onValueChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <StyledCheckbox>
      <CheckBox
        color={isChecked ? `${Colors.primary}` : undefined}
        disabled={false}
        value={isChecked}
        onValueChange={onValueChange}
        onPress={() => setIsChecked(!isChecked)}
      />
      <StyledInputLabel>{label}</StyledInputLabel>
    </StyledCheckbox>
  );
};

export default MedicalHistoryScreen;
