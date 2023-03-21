import { StatusBar } from 'expo-status-bar'
import { Table, Row, Rows } from 'react-native-table-component'

import {
    StyledContainer,
    InnerContainer,
    UpperContainer,
    PageTitle,
    Settings,
} from './styles'

import SettingsImage from '../../images/icons/settings.svg'

const ResultScreen = ({ navigation }) => {
    const header = ['heading 1', 'heading 2', 'heading 3']
    const data = [
        ['gfg1', 'gfg2', 'gfg3'],
        ['gfg4', 'gfg5', 'gfg6'],
        ['gfg7', 'gfg8', 'gfg9']

    ]
    return (
        <StyledContainer>
            <StatusBar style='dark' />
            <InnerContainer>
                <UpperContainer>
                    <PageTitle>
                        Home
                    </PageTitle>
                    <Settings onPress={() => navigation.navigate('Settings')}>
                        <SettingsImage width="30px" height="30px" fill="#0F2E53" />
                    </Settings>
                </UpperContainer>
                <Table borderStyle={{
                    borderWidth: 2,
                    borderColor: '#c8e1ff'
                }}>
                    <Row data={header} />
                    <Rows data={data} />
                </Table>
            </InnerContainer>
        </StyledContainer>
    )
}

export default ResultScreen