import React from "react";
import "./index.css";

export default function Modal({ isShow, data, onCancel }) {
    if (!isShow || !data) return null;

    const imageUrl = data.i?.imageUrl || "https://via.placeholder.com/300";
    const title = data.l || "No Title";
    const platform = data.platform || "Unknown Platform";
    const year = data.y || "Unknown Year";
    const cast = data.s || "Cast information not available";

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onCancel}>
                    &times;
                </button>
                <div className="modal-image">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="modal-info">
                    <h2 className="modal-header">Data Information</h2>
                    <p><strong>Judul:</strong> {title}</p>
                    <p><strong>Platform:</strong> {platform}</p>
                    <p><strong>Tahun rilis:</strong> {year}</p>
                    <p><strong>Pemeran:</strong> {cast}</p>
                </div>
                <button className="modal-close-button" onClick={onCancel}>
                    Close
                </button>
            </div>
        </div>
    );
}
