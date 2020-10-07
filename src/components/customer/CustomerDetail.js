import React, { useEffect, useState, useContext } from "react"
import { CustomerContext } from "./CustomerProvider"
import { useParams } from "react-router-dom"

export const CustomerDetail = () => {
    const { getCustomerById } = useContext(CustomerContext)

    const [customer, setCustomer] = useState({})

    const { customerId } = useParams()

    useEffect(() => {
        getCustomerById(customerId)
            .then(response => setCustomer(response))
    }, [])

    return (
        <section className="customer">
            <h3 className="customer__name">{customer.name}</h3>
            <div className="customer__email">{customer.email}</div>
            <div className="customer__address">{customer.address}</div>
        </section>
    )
}