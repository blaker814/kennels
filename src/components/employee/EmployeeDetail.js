import React, { useEffect, useContext, useState } from "react"
import { useParams } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
    
export const EmployeeDetail = () => {
    const { getEmployeeById } = useContext(EmployeeContext)
    
    const [employee, setEmployee] = useState({})
    const [location, setLocation] = useState({})
    
    const { employeeId } = useParams()

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
        </section>
    )
}