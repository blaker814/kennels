import React, { useState, createContext } from "react"

export const LocationContext = createContext()

/*
 This component establishes what data can be used.
 */
export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations")
            .then(res => res.json())
            .then(setLocations)
    }

    const addLocation = location => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
    }

    const getLocationById = id => {
        return fetch(`http://localhost:8088/locations/${id}?_embed=employees&_embed=animals`)
            .then(res => res.json())
    }

    const closeLocation = id => {
        return fetch(`http://localhost:8088/locations/${id}`, {
            method: "DELETE"
        })
    }

    const updateLocation = location => {
        return fetch(`http://localhost:8088/locations/${location.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
    }

    return (
        <LocationContext.Provider value={{
            locations, getLocations, addLocation, getLocationById, closeLocation, updateLocation
        }}>
            {props.children}
        </LocationContext.Provider>
    )
}