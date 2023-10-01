import { useState } from 'react';
import axios from 'axios';

const Front = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3001/api/scrape', {
                query: query
            });

            const result = response.data;
            
            // Check if result exists
            if (result) {
                setData(result);
            } else {
                setError("Received unexpected data format from the backend.");
            }
            
        } catch (error) {
            setError(`Error occurred while fetching data: ${error.message}`);
            console.error("Failed to fetch data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search Query" />
            <button onClick={fetchData}>Search</button>

            {loading && <p>Loading...</p>}

            {error && <div className="error">{error}</div>}

            {data && (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
        </div>
    );
}

export default Front;
