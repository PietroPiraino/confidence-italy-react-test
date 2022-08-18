import React, {useCallback, useEffect, useState} from 'react';
import "./ScrollContainer.css"

const ScrollContainer = (props) => {
    const [locationsReq, setLocationsReq] = useState({start: 3, limit: 3})
    const {infiniteScroll} = props

    const scrollHandler = useCallback((e) => {
        const scrollComponent = document.querySelector(".scroll-container")
        const heightDiff = window.innerHeight - e.target.offsetHeight
        if (e.target.scrollHeight - e.target.scrollTop - 5 <= window.innerHeight - heightDiff) {
            infiniteScroll(locationsReq)
            scrollComponent.removeEventListener("scroll", scrollHandler)
            setLocationsReq(prevState => ({start: prevState.start + 3, limit: 3}))
        }
    }, [locationsReq, infiniteScroll])

    useEffect(() => {
        const scrollComponent = document.querySelector(".scroll-container")
        setTimeout(() => scrollComponent.addEventListener("scroll", scrollHandler), 300)

        return () => scrollComponent.removeEventListener("scroll", scrollHandler)
    }, [locationsReq, scrollHandler])

    return (
        <div className="scroll-container">
            <div className="scroll-container__cards-container">
                {props.children}
            </div>
        </div>
    );
};

export default ScrollContainer;
