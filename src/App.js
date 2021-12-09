import './App.css';
import {useEffect, useState} from "react";
import Quote from "./components/quote";

function App() {
    const generateRandomNumber = () => Math.floor(Math.random() * data.length);
    const URL = 'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json';

    const [data, setData] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [prev, setPrev] = useState();
    const [curr, setCurr] = useState();

    useEffect(() => {
        fetch(URL)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response;
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                setError(error)
            })
            .finally(() => {
                if(data.length){
                    setCurr(generateRandomNumber());
                    setLoading(false);
                }
            })
    }, [data.length]);


    const handleNext = () => {
        let temp = generateRandomNumber();

        while (temp === curr)
            temp = generateRandomNumber();

        setPrev(curr);
        setCurr(temp);
    }

    const handlePrev = () => {
        setCurr(prev);
        setPrev(null);
    }

    return (
        <div className="container bg-light vh-100">
            {
                loading
                    ? <div className="spinner-border m-auto" style={{width: "3rem", height: "3rem"}} role="status">
                    </div>
                    : <>
                        <Quote data={data[curr]}/>
                        <div className="buttonPanel">
                            <button onClick={handlePrev} className={"btn btn-lg btn-primary p-3 col-4 mx-auto my-auto"} disabled={!prev}>Prev</button>
                            <button onClick={handleNext} className={"btn btn-lg btn-success p-3 col-4  mx-auto my-auto"}>Next</button>
                        </div>
                    </>
            }

        </div>
    );
}

export default App;
