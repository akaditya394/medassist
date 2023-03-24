import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    IconsContainer,
    PageTitle,
    Icon,
    SelectImage,
    BottomContainer,
    StyledButton,
    ButtonText,
    PrescriptionImage,
    TableContainer
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'
import { Table, Row, Rows } from 'react-native-table-component'
import { Colors } from '../../shared/variables'

const ResultScreen = ({ navigation }) => {
    const tableHead = ['Drug name', 'Side Effects', 'Alternatives']
    const tableData = [
        ['Drug 1', 'Side Effect 1', 'Alternative 1'],
        ['Drug 2', 'Side Effect 2', 'Alternative 2'],
        ['Drug 3', 'Side Effect 3', 'Alternative 3']
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
                <SelectImage>
                    <PrescriptionImage resizeMode="cover" source={require('../../images/test/prescription.png')} />
                </SelectImage>
                <TableContainer>
                    <Table borderStyle={{ borderWidth: 1, borderColor: `${Colors.primary}` }}>
                        <Row data={tableHead} style={{
                            height: 50, backgroundColor: `${Colors.tertiary}`
                        }} textStyle={{ margin: 6, fontWeight: 'bold' }} />
                        <Rows data={tableData} textStyle={{ margin: 6 }} />
                    </Table>
                </TableContainer>
                <BottomContainer>
                    <StyledButton onPress={() => navigation.navigate('SideEffects')}>
                        <ButtonText>Add your side effects</ButtonText>
                    </StyledButton>
                </BottomContainer>
            </InnerContainer>
        </StyledContainer>
    )
}

export default ResultScreen