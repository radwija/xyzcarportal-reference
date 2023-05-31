import { Link } from "react-router-dom";
import { React } from "react";

const Card = (props) => {
    return (
        <article class="card">
            <div class="card-img"></div>
            <Link to={`/viewCar/${props.carId}`}>
                <div class="card-img-hover">
                    <img src="https://cdn.idntimes.com/content-images/post/20220315/red-tesla-model-3-fefc48e4a17a6fa56e5c6470c5173f35_600x400.jpg" />
                </div>
            </Link>
            <div class="card-info">
                <span class="card-category">{props.model} - {props.makeYear}</span>
                <h3 class="card-title">{props.carName}</h3>
                <span class="price">{props.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </span>
            </div>
        </article>
    )
}

export default Card;