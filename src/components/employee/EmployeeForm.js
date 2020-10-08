import React, { useEffect, useContext, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"

export const EmployeeForm = () => {
    const { addEmployee, getEmployeeById, updateEmployee } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)

    const [employee, setEmployee] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const {employeeId} = useParams()

    const handleControlledInputChange = event => {
        const newEmployee = { ...employee }
        newEmployee[event.target.name] = event.target.value
        setEmployee(newEmployee)
    }

    useEffect(() => {
        getLocations().then(() => {
            if (employeeId) {
                getEmployeeById(employeeId)
                .then(employee => {
                    setEmployee(employee)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const constructEmployeeObject = () => {
        if (employeeId) {
            updateEmployee({
                id: employee.id,
                name: employee.name,
                locationId: parseInt(employee.locationId)
            })
            .then(() => history.push(`/employees/detail/${employeeId}`))
        } else {
            addEmployee({
                name: employee.name,
                locationId: parseInt(employee.locationId)
            })
            .then(() => history.push("/employees"))
        }
    }

    const history = useHistory()

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">
                {employeeId ? "Update Employee" : "New Employee"}
            </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name: </label>
                    <input type="text" id="employeeName" name="name" required autoFocus 
                    className="form-control" placeholder="Employee name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={employee.name} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Assign to location: </label>
                    <select value={employee.locationId} name="locationId" id="animalLocation" 
                    className="form-control" 
                    onChange={handleControlledInputChange} >
                        <option value="0" hidden>Select a location</option>
                        {locations.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                disabled={isLoading}
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructEmployeeObject()
                }}
                className="btn btn-primary">
                {employeeId ? "Save Employee" : "Add Employee"}
            </button>
        </form>
    )
}