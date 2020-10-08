import React, { useEffect, useContext, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
    
export const EmployeeDetail = () => {
    const { getEmployeeById, fireEmployee } = useContext(EmployeeContext)
    
    const [employee, setEmployee] = useState({})
    const [location, setLocation] = useState({})
    
    const { employeeId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getEmployeeById(employeeId)
        .then((response) => {
			setEmployee(response)
			setLocation(response.location)
		})
    }, [])

    return (
        <section className="employee">
            <h3 className="employee__name">{employee.name}</h3>
            <div className="employee__location">Location: {location.name}</div>
            <button type="button" onClick={() => {
                fireEmployee(employee.id)
                    .then(() => {
                        history.push("/employees")
                    })
            }}>Fire Employee</button>
            <button type="button" onClick={() => {
                history.push(`/employees/edit/${employee.id}`)
            }}>Edit</button>
        </section>
    )
}