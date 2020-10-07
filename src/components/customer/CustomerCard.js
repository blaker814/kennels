import React from "react"
import "./Customer.css"
import { Link } from "react-router-dom"

export const CustomerCard = ({ customer }) => (
    <section className="customer">
        <h3 className="customer__name">
            <Link to={`/customers/detail/${customer.id}`}>
                {customer.name}
            </Link>
        </h3>
    </section>
)