import React, { useContext, useState, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { useParams, useHistory } from "react-router-dom"

export const LocationDetail = () => {
    const { getLocationById, closeLocation } = useContext(LocationContext)

    const [location, setLocation] = useState({})
    const [employees, setEmployees] = useState([])
    const [animals, setAnimals] = useState([])

    const { locationId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getLocationById(locationId)
            .then(response => {
                setLocation(response)
                setEmployees(response.employees)
                setAnimals(response.animals)
            })
    }, [])

    return (
        <section className="location">
            <h3 className="location__name">{location.name}</h3>
            <div className="location__address"><em>{location.address}</em></div>
            <div className="location__employees">
                <h4>Employees</h4> 
                <p>
                    {
                        employees.map(employee => employee.name).join(", ")
                    }
                </p>
            </div>
            <div className="location__animals">
                <h4>Current Residents</h4>
                <p>
                    {
                        animals.map(animal => animal.name).join(", ")
                    }
                </p>
            </div>
            <button type="button" onClick={() => {
                closeLocation(location.id)
                .then(() => history.push("/locations"))
            }}>Close Location</button>
            <button type="button" onClick={() => {
                history.push(`/locations/edit/${location.id}`)
            }}>Edit</button>
        </section>
    )
}