import React, { useEffect, useContext, useRef } from "react"
import { useHistory } from "react-router-dom"
import { LocationContext } from "./LocationProvider"

export const LocationForm = () => {
    const { addLocation } = useContext(LocationContext)

    const name = useRef()
    const address = useRef()

    const constructNewLocation = () => {

        addLocation({
            name: name.current.value,
            address: address.current.value
        })
        .then(() => history.push("/Locations"))
    }

    const history = useHistory()

    return (
        <form className="locationForm">
            <h2 className="locationForm__title">New Location</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationName">Location name: </label>
                    <input type="text" id="locationName" ref={name} required autoFocus className="form-control" placeholder="Location name" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" ref={address} required className="form-control" placeholder="Address" />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewLocation()
                }}
                className="btn btn-primary">
                Save Location
            </button>
        </form>
    )
}