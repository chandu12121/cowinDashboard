// Write your code here

import {BarChart, Bar, Legend, XAxis, YAxis} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}K`
    }
    return number.toString()
  }

  const {VaccinationByCoverageDetails} = props

  return (
    <div>
      <h1 className="heading4">Vaccination Coverage</h1>

      <BarChart
        data={VaccinationByCoverageDetails}
        margin={{
          top: 5,
        }}
        width={900}
        height={400}
      >
        <XAxis
          dataKey="vaccinationDate"
          tick={{
            stroke: '#6c757d',
            strokeWidth: 1,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{
            stroke: '6c757d',
            strokeWidth: 0.5,
            fontSize: 15,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            paddingTop: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          barSize="20%"
          radius={[10, 10, 0, 0]}
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          barSize="20%"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
