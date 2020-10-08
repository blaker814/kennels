import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { LocationContext } from "./LocationProvider"

export const LocationForm = () => {
    const { addLocation, updateLocation, getLocationById } = useContext(LocationContext)

    const [location, setLocation] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const {locationId} = useParams()
    const history = useHistory()

    useEffect(() => {
        if (locationId) {
            getLocationById(locationId)
            .then(location => {
                setLocation(location)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const handleControlledInputChange = event => {
        const newLocation = { ...location }
        newLocation[event.target.name] = event.target.value
        setLocation(newLocation)
    }

    const constructLocationObject = () => {
        setIsLoading(false);
        if (locationId) {
            updateLocation({
                id: location.id,
                name: location.name,
                address: location.address
            })
            .then(() => history.push(`/locations/detail/${location.id}`))
        } else {
            addLocation({
                name: location.name,
                address: location.address
            })
            .then(() => history.push("/locations"))
        }
    }

    return (
        <form className="locationForm">
            <h2 className="locationForm__title">
                {locationId ? "Update Location" : "New Location"}
            </h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationName">Location name: </label>
                    <input type="text" id="locationName" name="name" required autoFocus 
                    className="form-control" placeholder="Location name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={location.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input type="text" id="address" name="address" required 
                    className="form-control" placeholder="Address" 
                    onChange={handleControlledInputChange} 
                    defaultValue={location.address} />
                </div>
            </fieldset>
            <button type="submit"
                disabled = {isLoading}
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructLocationObject()
                }}
                className="btn btn-primary">
                {locationId ? "Save Location" : "Add Location"}
            </button>
        </form>
    )
}