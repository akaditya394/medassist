import React from "react"

const SideEffectsTable = () => {
    return (
        <table>
            <tr>
                <th>#id</th>
                <th>Drug name</th>
                <th>Symptoms</th>
                <th>Alternatives</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Microcef CV 200 mg</td>
                <td>Throat infections</td>
                <td>Goodcif CV 200mg</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Ventryl D</td>
                <td>Sore throat</td>
                <td>Chericof</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Pantotav DSR</td>
                <td>Acidity</td>
                <td>Pantin D</td>
            </tr>
            <tr>
                <td>4</td>
                <td>BENZ Pearls</td>
                <td>Dry cough</td>
                <td>-</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Montak LC</td>
                <td>Runny nose, watery eyes, sneezing</td>
                <td>Levocet M</td>
            </tr>
        </table>
    )
}

export default SideEffectsTable