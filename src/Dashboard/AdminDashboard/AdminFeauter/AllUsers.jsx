import React from 'react'
import { useLoaderData } from 'react-router-dom'

function AllUsers() {
    const usersData = useLoaderData()
    console.log(usersData)
    return (
        <div>AllUsers</div>
    )
}

export default AllUsers