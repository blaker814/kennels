import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CustomerContext = createContext()

/*
 This component establishes what data can be used.
 */
export const CustomerProvider = (props) => {
    const [customers, setCustomers] = useState([])

    const getCustomers = () => {
        return fetch("http://localhost:8088/customers")
            .then(res => res.json())
            .then(setCustomers)
    }

    const addCustomer = customer => {
        return fetch("http://localhost:8088/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(getCustomers)
    }

    const getCustomerById = id => {
        return fetch(`http://localhost:8088/customers/${id}`)
            .then(res => res.json())
    }

    return (
        <CustomerContext.Provider value={{
            customers, getCustomers, addCustomer, getCustomerById
        }}>
            {props.children}
        </CustomerContext.Provider>
    )
}