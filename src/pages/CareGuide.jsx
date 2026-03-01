import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import terrariumDatabase from "../data/terrariumData";
import { useNavigate } from "react-router-dom";
import { getTerrariumByCode } from "../api/terrariumApi";
import "./CareGuide.css"

const CareGuide = () => {

    const navigate = useNavigate();


    const { code } = useParams();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);




    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const result = await getTerrariumByCode(code);
                setData(result);

            } catch (err) {
                setError(err.message);

            } finally {
                setLoading(false);

            }
        };

        fetchData();

    }, [code]);




    if (loading) {
        return <div className="spinner"></div>

    }
    if (error) {
        return (
            <div className="care-container">
                <p className="error-text">
                    {error}
                </p>
                <button onClick={() => window.location.reload()}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <section className="care">

            <h2>Your Terrarium Care Guide</h2>
            <h2>{data.name}</h2>
            <p>Your terrrarium code: {code}</p>
            <ul>
                <li>💧 Watering: {data.watering}</li>
                <li>☀️ Light: {data.sunlight}</li>
                <li>Maintenance: {data.maintenance}</li>
            </ul>

            <p className="care-season">
                Current season: Monsoon(India)
            </p>
            <button onClick={() => navigate("/")}>
                Back to Home
            </button>

        </section>
    )
}


export default CareGuide;
