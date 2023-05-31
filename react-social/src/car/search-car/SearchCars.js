import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Card from '../../components/Card.js'

export default function SearchCars() {
    const [cars, setCars] = useState([]);

    const { filter, q, min, max } = useParams();

    useEffect(() => {
        console.log("search car works")
        loadSearchedCars();
    }, [filter, q, min, max])

    const loadSearchedCars = async () => {
        let result = await axios.get("http://localhost:2323/rest/cars");
        const keyword = encodeURI(q);
        if (filter === "carname") {
            console.log(`search by carname: ${q}`);
            result = await axios.get(`http://localhost:2323/rest/search?by=carName&keyword=${q}`)
        }
        else if (filter === "model") {
            console.log(`search by model: ${q}`);
            result = await axios.get(`http://localhost:2323/rest/search?by=model&keyword=${q}`)
        }
        else if (filter === "makeyear") {
            console.log(`search by make year: ${q}`);
            result = await axios.get(`http://localhost:2323/rest/search?by=makeYear&keyword=${q}`)
        }
        else if (filter === "price") {
            console.log(`search by price: min: ${min} max: ${max}`);
            if (min != null && max == null) {
                result = await axios.get(`http://localhost:2323/rest/search?by=price&min=${min}`)
            } else if (min == null && max != null) {
                result = await axios.get(`http://localhost:2323/rest/search?by=price&max=${max}`)
            } else if (min !== null && max !== null) {
                result = await axios.get(`http://localhost:2323/rest/search?by=price&min=${min}&max=${max}`)
            }
        }
        console.log(result.data);
        setCars(result.data);
    }

    return (
        <div>
            <div className="heading">
                <Link className='btn btn-dark' to="/">« Go to home</Link>
                <h1>Search Result</h1>
            </div>
            <div className='cards'>
                {
                    cars.map((car, index) => (
                        <div>
                            {car.id}
                            {car.carName}
                            {car.model}
                            {car.makeYear}
                            {car.price}
                            <Card carId={car.id} carName={car.carName} model={car.model} makeYear={car.makeYear} price={car.price} />
                        </div>
                        
                        ))
                }
            </div>
        </div>
    )
}
