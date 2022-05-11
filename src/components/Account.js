import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import Logout from './Logout';
import { currentUrl } from '../utils/backendUrl';
import Item from './Item';
import "../styles/Account.css"

function Account() {

    const navigate = useNavigate()

    const headers = {
        Accept: "application/json",
        Authorization: window.localStorage.getItem('token')
    }
    
    const trackerHeaders = {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NTExNDY2MTcsImV4cCI6MTY4MjY4MjYxNywiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiMDY5YjIxZTgtNTdjZi00YmE2LTk1ODctMjJkYmViMDg4OTNhIn0.wTcGGMWd6wf3F68K6cgZcmEyiNv6EfVZsvttbzIwtIE"
    }

    const {user_id} = useParams();
    const [user, setUser] = useState();
    const [trackingNumber, setTrackingNumber] = useState("BPSY1Y78Q1B7ZBR");
    const [packageInfo, setPackageInfo] = useState(null);
    const [packageInfoFromCatch, setPackageInfoFromCatch] = useState(null);
    const [item, setItem] = useState(); // item that gets passed into the Item component if clicked //
    const [itemPopupTrigger, setItemPopupTrigger] = useState(false) // item popup opens on true // 

    useEffect(() => {
        fetchAccount(user_id)
    },[user_id])

    const fetchAccount = () => {
        axios.get(`${currentUrl}/api/users/${user_id}`, {headers})
            .then(res => {
                console.log(res)
                setUser(res.data)
            })
            .catch(err => {
                    console.log(err)
                    navigate("/")
            })
    }

    const changeHandler = e => {
        e.persist();
        setTrackingNumber(e.target.value);
    }

    const search = number => {
        axios.get(` https://bps.bringer.dev/public/api/v2/get/parcel/tracking.json?tracking_number=${number}`, {trackerHeaders})
            .then(res => {
                console.log(res.data)
                setPackageInfoFromCatch(null)
                setPackageInfo(res.data)
            })
            .catch(err => {
                console.log(err.response.data) //the data is coming back nested inside an error response//
                setPackageInfo(null)
                setPackageInfoFromCatch(err.response.data.data.label)
            })
    }

    const formSubmit = e => {
        e.preventDefault()
        search(trackingNumber)
    }

    const openItem = (item) => {
        setItem(item);
        setItemPopupTrigger(true)
    }

  return (
    <div>
        <Logout />
        {user? <h3>Welcome {user.username}</h3>: null} 
        <div>
            <p>Enter your tracking number</p>
            <form 
                onSubmit={formSubmit}
                className="tracking-form">
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
                {packageInfoFromCatch? 
                <div>
                    <p>Tracking Number: {packageInfoFromCatch.trackingNumber}</p>
                    <p>Model: {packageInfoFromCatch.model}</p>
                    <p>Parcel type: {packageInfoFromCatch.parcel.parcelType}</p> 
                    <p>Recipient: {packageInfoFromCatch.parcel.recipient.firstName} {packageInfoFromCatch.parcel.recipient.lastName}</p>
                    <p>Address: {` 
                        ${packageInfoFromCatch.parcel.recipient.address.address_detail.street}
                        , 
                        ${packageInfoFromCatch.parcel.recipient.address.address_detail.streetNumber}, 
                        ${packageInfoFromCatch.parcel.recipient.address.address_detail.streetLine2}, 
                        ${packageInfoFromCatch.parcel.recipient.address.address_detail.city} -  
                        ${packageInfoFromCatch.parcel.recipient.address.address_detail.state}, 
                        ${packageInfoFromCatch.parcel.recipient.address.address_detail.postalCode},
                        ${packageInfoFromCatch.parcel.recipient.address.address_detail.country.name}`}
                    </p>
                </div>
                 : null}
                 {packageInfo? 
                <div>
                    <p style={{color: "yellow"}}>Tracking Number: {packageInfo.label.tracking_number}</p>
                    <p>Model: {packageInfo.label.model}</p>
                    <p>Status: {packageInfo.status}</p> 
                    <div>
                        <h3 style={{textDecoration:"underline"}}>
                            Items
                        </h3> 
                        <div className='items-div'>
                        {packageInfo.parcel_tracking_items.map(item => {
                            return <div 
                                        key={item.id} 
                                        onClick={() => openItem(item)}
                                        className="item">
                                        <p>{item.id}</p>
                            </div>
                        })}
                        </div>
                    </div>
                </div> : null}
            </div>
        </div>
        <Item 
            item={item}
            itemPopupTrigger={itemPopupTrigger}
            setItemPopupTrigger={setItemPopupTrigger}/>
    </div>
  )
}

export default Account