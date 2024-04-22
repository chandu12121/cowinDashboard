// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    vaccinationData: {},
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const covidVacinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(covidVacinationDataApiUrl)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccinationDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        VaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),

        VaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="heading2">Something went wrong</h1>
    </div>
  )

  renderVaccinationStates = () => {
    const {vaccinationData} = this.state

    return (
      <>
        <VaccinationCoverage
          VaccinationByCoverageDetails={vaccinationData.last7DaysVaccination}
        />
        <VaccinationByGender
          VaccinationByGenderDetails={vaccinationData.VaccinationByGender}
        />
        <VaccinationByAge
          VaccinationByAgeDetails={vaccinationData.VaccinationByAge}
        />
      </>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStates()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="div2">
        <div>
          <div className="div1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="img"
            />
            <h1 className="heading1">CO-WIN</h1>
          </div>
          <h1 className="heading2">CoWIN Vaccination in India</h1>
          {this.renderViewBasedOnApiStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
