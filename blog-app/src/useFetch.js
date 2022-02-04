import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(
                url, 
                { 
                    method: 'GET',
                    headers: 
                    {
                        "Content-Type": "application/json",
                        'Authorization': localStorage.getItem("token"),
                    }
                },
                { 
                    signal: abortCont.signal
                }
                
                )
            .then(res => {
                if(!res.ok){
                    res.json(res.message);
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                // console.log(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                }
                else{
                    setError(err.message);
                    setIsPending(false);
                }
            })
        }, 5);

        return () => abortCont.abort();
    }, [url]);

    return {data, isPending, error};
}

export default useFetch;