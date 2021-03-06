import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import "./Animal.css"

export const AnimalSearch = () => {
    const { setSearchTerms } = useContext(AnimalContext)

    useEffect(() => {
        setSearchTerms("")
    }, [])
    
    return (
        <>
            <label htmlFor="animalSearch">Search animals: </label> 
            <input type="text"
                className="input--wide"
                id="animalSearch"
                onKeyUp={
                    (keyEvent) => setSearchTerms(keyEvent.target.value)
                }
                placeholder="Search for an animal... " />
        </>
    )
}