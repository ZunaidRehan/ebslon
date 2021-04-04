import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = props => {
    let loding = null;
    if (props.show) {
        loding = (
            <div className="overlay">
                <Spinner animation={props.animation || "border"} role="status" variant={props.variant || "light"} >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        );
    }
    return (
        loding
    );
}

export default Loader;