import './App.css';
import {useCallback, useEffect, useMemo, useState} from "react";
import useHttp from "./hooks/useLocationHook";
import ScrollContainer from "./components/ScrollContainer";
import Card from "./components/Card";

function App() {
    const [locations, setLocations] = useState([])

    const transformLocations = useCallback(locationsObj => {
        const newLocations = locationsObj.locations.map((location) => ({
            address: location.address,
            type: location.locationType,
            details: location.locationDetails
        }))

        setLocations(prevLocations => {
            return [...prevLocations, ...newLocations]
        })
    }, [])

    const httpData = useHttp(useMemo(() => ({
        url: '/locations',
        method: 'POST',
        body: {start: 0, limit: 3},
        headers: {'Content-Type': 'application/json', 'Username': "REMOVED"},
        mode: 'cors'
    }), []), transformLocations)

    const {isLoading, error, sendRequest: fetchLocations} = httpData

    useEffect(() => {
        fetchLocations()
    }, [fetchLocations])

    return (
        <div className="App">
            <h1>Confidence System React Test</h1>
            <div className="is-loading">{isLoading && "Loading cards.."}</div>
            {error && <div>{error}</div>}
            <ScrollContainer locations={locations} infiniteScroll={fetchLocations}>
                {locations.map((loc, i) => <Card location={loc} key={i}/>)}
            </ScrollContainer>
        </div>
    );
}

export default App;
