import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Alert from 'react-s-alert';
import { ACCESS_TOKEN } from '../../constants';

const SaveCar = () => {
  const navigate = useNavigate();

  const [car, setCar] = useState({
    carName: "",
    model: "",
    makeYear: "",
    price: "",
  });

  const { carName, model, makeYear, price } = car;

  const onInputChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(ACCESS_TOKEN)
    // Check token
    if (!token) {
      Alert.error('You must login before submit')
      navigate('/login')
      return;
    }

    const headers = {
      headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    };
    axios.post("http://localhost:8080/car/save-car", car, headers).then(data => {
      navigate("/");
      Alert.success('Congratulations! Car has been submitted!')
    }).catch(error => {
      Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
    });
  };

  return (
    <div>
      <div className='heading'>
        <h1>Car List</h1>
        <Link to={"/"} className='btn btn-dark'>❌ Cancel</Link>
      </div>
      <form onSubmit={(e) => onSubmit(e)} className="row g-3">
        <div className="col-md-12">
          <label for="carName" class="form-label">Car Name</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter car name"
            name="carName"
            value={carName}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div className="col-md-12">
          <label for="model" class="form-label">Model</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter model"
            name="model"
            value={model}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div className="col-md-12">
          <label for="makeYear" class="form-label">Make Year</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter make year"
            name="makeYear"
            value={makeYear}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div className="col-md-12">
          <label for="price" class="form-label">Price</label>
          <input
            type={"text"}
            className="form-control"
            placeholder="Enter price"
            name="price"
            value={price}
            onChange={(e) => onInputChange(e)} required />
        </div>
        <div class="col-12">
          <button type='submit' className='btn btn-primary' >Submit</button>
        </div>
      </form>
    </div>
  )
}

export default SaveCar;
