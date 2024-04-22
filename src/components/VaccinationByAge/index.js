// Write your code here
import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {VaccinationByAgeDetails} = props

  return (
    <div>
      <h1 className="heading3">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          cx="50%"
          cy="30%"
          data={VaccinationByAgeDetails}
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>

        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
