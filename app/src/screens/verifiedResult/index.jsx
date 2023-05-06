import { StatusBar } from 'expo-status-bar'
import { Text } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    Notice,
    StyledText,
    ListTitle,
    StyledButton,
    ButtonText,
    Line,
    TableContainer
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import { Colors } from '../../shared/variables'

const VerifiedResultScreen = ({ navigation }) => {
    const tableHead = ['Drug name', 'Symptoms', 'Alternatives']
    const tableData = [
        ['Microcef CV 200 mg', 'Throat infections', 'Goodcif CV 200mg'],
        ['Ventryl D', 'Sore throat', 'Chericof'],
        ['Pantotav DSR', 'Acidity', 'Pantin D'],
        ['BENZ Pearls', 'Dry cough', '-'],
        ['Montak LC', 'Runny nose, watery eyes, sneezing', 'Levocet M']
    ]

    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Result
                    </PageTitle>
                    <IconsContainer>
                        <Icon settings={true} onPress={() => navigation.navigate('Settings')}>
                            <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                        </Icon>
                    </IconsContainer>
                </UpperContainer>
                <Notice>
                    <StyledText>
                        Your upload prescription has been verified by{' '}
                        <Text style={{ fontWeight: 'bold' }}>Dr. Puneet Sharma</Text>
                        , a trained medical professional.
                    </StyledText>
                </Notice>
                <ListTitle>Drugs' names and alternatives</ListTitle>
                <TableContainer>
                    <Table borderStyle={{ borderWidth: 1, borderColor: `${Colors.primary}` }}>
                        <Row data={tableHead} style={{
                            height: 50, backgroundColor: `${Colors.tertiary}`
                        }} textStyle={{ margin: 6, fontWeight: 'bold' }} />
                        <Rows data={tableData} textStyle={{ margin: 6 }} />
                    </Table>
                </TableContainer>
                <Line />
                <StyledButton onPress={() => navigation.navigate('UpdatedPrescription')}>
                    <ButtonText>Generate an updated prescription</ButtonText>
                </StyledButton>
            </InnerContainer>
        </StyledContainer>
    )
}

export default VerifiedResultScreen