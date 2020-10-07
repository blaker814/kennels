import React, { useContext, useEffect } from "react"
import { LocationContext } from "./LocationProvider"
import { LocationCard } from "./LocationCard"
import "./Location.css"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "../employee/EmployeeProvider"
import { AnimalContext } from "../animal/AnimalProvider"

export const LocationList = () => {
    const { locations, getLocations } = useContext(LocationContext)
    const { employees, getEmployees } = useContext(EmployeeContext)
    const { animals, getAnimals } = useContext(AnimalContext)
	
    useEffect(() => {
        getLocations().then(getEmployees).then(getAnimals)
    }, [])

    const history = useHistory()

    return (	
        <>
            <h2>Locations</h2>
            <button type="button" onClick={() => history.push("/locations/create")}>New Location</button>
            <div className="locations">
                {
                    locations.map(location => {
                        const locationEmployees = employees.filter(employee => {
                            return employee.locationId === location.id
                        })
                        const locationAnimals = animals.filter(animal => {
                            return animal.locationId === location.id
                        })
                        return <LocationCard 
                            key={location.id} 
                            employees={locationEmployees} 
                            animals={locationAnimals} 
                            location={location} 
                        />
                    })
                }
            </div>
        </>
    )
}