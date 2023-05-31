import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const SearchBar = () => {
    let navigate = useNavigate();

    const [selectedFilter, setSelectedFilter] = useState('');

    const handleRadioChange = (e) => {
        setSelectedFilter(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const filter = e.target.filter.value;

        let carNameKeyword = e.target.carNameKeyword.value;
        let modelKeyword = '';
        let makeYearKeyword = '';
        let price = '';
        let min = '';
        let max = '';

        if (isInSearch) {
            carNameKeyword = e.target.carNameKeyword.value;
            modelKeyword = e.target.modelKeyword.value;
            makeYearKeyword = e.target.makeYearKeyword.value;
            price = e.target.price.value;
            min = e.target.min.value;
            max = e.target.max.value;
        } else {
            carNameKeyword = e.target.carNameKeyword?.value || '';
            modelKeyword = e.target.modelKeyword?.value || '';
            makeYearKeyword = e.target.makeYearKeyword?.value || '';
            price = e.target.carNameKeyword?.value || '';
            min = e.target.min?.value || '';
            max = e.target.max?.value || '';
        }

        if (filter == "carname") {
            console.log(`car name: ${filter} ${carNameKeyword}`)
            navigate(`/search/by/carname/q/${carNameKeyword}`);
            // navigate(`/`);
        } else if (filter == "model") {
            navigate(`/search/by/model/q/${modelKeyword}`);
        } else if (filter == "makeyear") {
            navigate(`/search/by/makeyear/q/${makeYearKeyword}`);
        } else if (filter == "price") {
            if (min != '' && max == '') {
                navigate(`/search/by/price/min/${min}`);
            } else if (min == '' && max != '') {
                navigate(`/search/by/price/max/${max}`);
            } else if (min != '' && max != '') {
                navigate(`/search/by/price/min/${min}/max/${max}`);
            }
        }
    };

    const isInSearch = useLocation().pathname.includes("/search");

    return (
        <form id="search-form" onSubmit={onSubmit}>
            {!isInSearch ? (
                <div>
                    <div>
                        <input type="hidden" id="carname" name="filter" value="carname" />
                        <input type="text" className='form-control' name="carNameKeyword" placeholder='Search' required />
                    </div>
                </div>) : (

                <div>
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" >
                                    Car Name
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <div>
                                        <input type="radio" id="carname" className='radio-input' name="filter" value="carname" onChange={handleRadioChange} />
                                        <label htmlFor="carname">Car Name</label>
                                        <input type="text" name="carNameKeyword" className='form-control' placeholder='Car Name' required={selectedFilter === 'carname'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" >
                                    Model
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <div>
                                        <input type="radio" id="model" className='radio-input' name="filter" value="model" onChange={handleRadioChange} />
                                        <label htmlFor="model">Model</label>
                                        <input type="text" id="anjing" name="modelKeyword" className='form-control' placeholder='Model' required={selectedFilter === 'model'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree" >
                                    Make Year
                                </button>
                            </h2>
                            <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <div>
                                        <input type="radio" id="makeyear" className='radio-input' name="filter" value="makeyear" onChange={handleRadioChange} />
                                        <label htmlFor="makeyear">Make Year</label>
                                        <input type="text" name="makeYearKeyword" className='form-control' placeholder='Make Year' required={selectedFilter === 'makeyear'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour" >
                                    Price
                                </button>
                            </h2>
                            <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                <div class="accordion-body">
                                    <div>
                                        <input type="radio" id="price" className='radio-input' name="filter" value="price" onChange={handleRadioChange} />
                                        <label htmlFor="price">Price</label>
                                        <input type="number" className='form-control' placeholder='Minimum Price' name="min" />
                                        <input type="number" className='form-control' placeholder='Maximum Price' name="max" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button type="submit" className='btn btn-light'>Search</button>

        </form>
    )
}

export default SearchBar;