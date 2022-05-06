import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useParams } from 'react-router-dom';
import Logout from './Logout';
import { currentUrl } from '../utils/backendUrl';


const headers = {
    Accept: "application/json",
    Authorization: window.localStorage.getItem('token')
}

const trackerHeaders = {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NTExNDY2MTcsImV4cCI6MTY4MjY4MjYxNywiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiMDY5YjIxZTgtNTdjZi00YmE2LTk1ODctMjJkYmViMDg4OTNhIn0.wTcGGMWd6wf3F68K6cgZcmEyiNv6EfVZsvttbzIwtIE"
}

function Account() {

    const {user_id} = useParams()
    const [user, setUser] = useState()
    const [trackingNumber, setTrackingNumber] = useState("BPS65O4WYLBWWBR")
    const [packageInfo, setPackageInfo] = useState(null)

    const fetchAccount = () => {
        axios.get(`${currentUrl}/api/users/${user_id}`, {headers})
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => {
                    console.log(err)
            })
    }

    useEffect(() => {
        setTimeout(fetchAccount(),1000) //to allow time for the currentUrl and user_id //
    },[])

    const changeHandler = e => {
        e.persist();
        setTrackingNumber(e.target.value);
    }

    const search = number => {
        axios.get(` https://bps.bringer.dev/public/api/v2/get/parcel/tracking.json?tracking_number=${number}`, {trackerHeaders})
            .then(res => {
                console.log("success" + res)
            })
            .catch(err => {
                console.log(err.response.data) //the data is coming back nested inside an error response//
                setPackageInfo(err.response.data.data.label)
            })
    }

    const formSubmit = e => {
        e.preventDefault()
        search(trackingNumber)
    }

  return (
    <div>
        <Logout />
        {user? <h3>Welcome {user.username}</h3>: null} 
        <div>
            <h4>BPS Tracking</h4>
            <p>Enter your tracking number</p>
            <form onSubmit={formSubmit}>
                <input 
                    name="trackingNumber"
                    id="trackingNumber"
                    value={trackingNumber}
                    onChange={changeHandler}
                    type="text"
                    />
                <button>Search</button>
            </form>
            <div>
                {packageInfo? 
                <div>
                    <p>Tracking Number: {packageInfo.trackingNumber}</p>
                    <p>Model: {packageInfo.model}</p>
                    <p>Parcel type: {packageInfo.parcel.parcelType}</p> 
                    <p>Recipient: {packageInfo.parcel.recipient.firstName} {packageInfo.parcel.recipient.lastName}</p>
                    <p>Address: {` 
                        ${packageInfo.parcel.recipient.address.address_detail.street}
                        , 
                        ${packageInfo.parcel.recipient.address.address_detail.streetNumber}, 
                        ${packageInfo.parcel.recipient.address.address_detail.streetLine2}, 
                        ${packageInfo.parcel.recipient.address.address_detail.city} -  
                        ${packageInfo.parcel.recipient.address.address_detail.state}, 
                        ${packageInfo.parcel.recipient.address.address_detail.postalCode},
                        ${packageInfo.parcel.recipient.address.address_detail.country.name}`}
                    </p>
                </div>
                 : null}
            </div>
        </div>
    </div>
  )
}

export default Account