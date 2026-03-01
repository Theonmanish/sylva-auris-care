import { useNavigate } from "react-router-dom";
import { useState } from "react";
import terrariumDatabase from "../data/terrariumData";
import "./Home.css";


function Home() {

    
    const navigate = useNavigate();
    const [code,setCode] = useState("")
    const [error,setError] = useState(null)

    const handleSubmit = (e) => {

        e.preventDefault();
        const trimmedCode = code.trim().toUpperCase();

        //Regex pattern
        const pattern = /^SA-TRM-\d{4}$/;

        if (!pattern.test(trimmedCode)) {
            setError("Invalid format. Use SA-TRM-XXXX");
            return;
        }

        if (terrariumDatabase[trimmedCode]){

            setError(null);
            navigate(`/care/${trimmedCode}`);
            
        }
        else {
            setError("Code not found");

        }
    };

    return (

        <div className="home-container">
            <h1>Sylva Auris</h1>
            <h2>Enter your terrarium code to access the care guide.</h2>

            <form onSubmit={handleSubmit}>
                <input
                    id="terrariumCode"
                    name="terrariumCode"
                    type="text"
                    placeholder="Enter Code (e.g. SA-TRM-2041)"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                        setError(null);
                    }}
                    
                />

                <button type="submit" disabled={!code.trim()}>View Care Guide</button>

            </form>

            {error && 
                <p className="error-text">{error}</p>
            }
        </div>


       
    );
}

export default Home