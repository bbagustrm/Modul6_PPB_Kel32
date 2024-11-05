import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import Modal from "../components/Modal";

export default function LandingPage() {
    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("One Piece");
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [modalShow, setModalShow] = useState(false);
    const [modalItem, setModalItem] = useState(null);

    useEffect(() => {
        const fetchData = async (query) => {
            setIsLoading(true);
            try {
                const response = await axios.get("https://online-movie-database.p.rapidapi.com/auto-complete", {
                    params: { q: query },
                    headers: {
                        "x-rapidapi-host": "online-movie-database.p.rapidapi.com",
                        'x-rapidapi-key': '219d896ad0msh73dc3a26ce032f2p19c572jsn9166a1e25f06',
                    },
                });
                if (response.status === 200) {
                    setData(response.data);
                    setIsLoaded(true);
                    localStorage.setItem("searchData", JSON.stringify(response.data));
                }
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOffline) {
            const cachedData = localStorage.getItem("searchData");
            if (cachedData) {
                setData(JSON.parse(cachedData));
                setIsLoading(false);
            }
        } else if (!isLoaded) {
            fetchData(query);
        }

        const handleOnlineStatus = () => setIsOffline(!navigator.onLine);
        window.addEventListener("online", handleOnlineStatus);
        window.addEventListener("offline", handleOnlineStatus);

        return () => {
            window.removeEventListener("online", handleOnlineStatus);
            window.removeEventListener("offline", handleOnlineStatus);
        };
    }, [isLoaded, query, isOffline]);

    const onSearch = (e) => {
        if (e.key === "Enter") {
            setIsLoaded(false);
            setQuery(e.target.value);
        }
    };

    const handleClick = (item) => {
        setModalShow(true);
        setModalItem(item);
    };

    return (
        <main>
            <input
                type="text"
                placeholder="Search film by name"
                onKeyDown={onSearch}
                disabled={isOffline}
            />
            <h3 className="title">Search : {query}</h3>
            {isOffline && <p>You are offline. Showing cached results.</p>}
            {!data || isLoading ? <p>Loading...</p> : (
                <div className="card-container">
                    {data.d.map((item, index) => (
                        <Card data={item} key={index} onClick={() => handleClick(item)} />
                    ))}
                </div>
            )}
            <Modal data={modalItem} isShow={modalShow} onCancel={() => setModalShow(false)} />
        </main>
    );
}
