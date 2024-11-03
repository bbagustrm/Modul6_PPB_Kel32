// Card.js
import React from "react";
import "./index.css";

export default function Card({ data, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            {data ? (
                <>
                    <figure>
                        <img
                            src={data.i?.imageUrl || "https://via.placeholder.com/150"}
                            alt={data.l || "Image"}
                        />
                    </figure>
                    <div className="card-info">
                        <h3>{data.l}</h3>
                        <p>{data.q}</p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
