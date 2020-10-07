import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"
import { useHistory } from "react-router-dom"

export const EmployeeList = () => {
   // This state changes when `getEmployees()` is invoked below
    const { employees, getEmployees } = useContext(EmployeeContext)
	
	//useEffect - reach out to the world for something
    useEffect(() => {
		    getEmployees()
    }, [])

    const history = useHistory()

    return (	
        <>
            <h2>Employees</h2>
            <button type="button" onClick={() => history.push("/employees/create")}>New Employee</button>
            <div className="Employees">
                {
                    employees.map(employee => {
                        return <EmployeeCard key={employee.id} employee={employee} />
                    })
                }
            </div>
        </>
    )
}