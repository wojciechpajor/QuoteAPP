import React from "react";

const Quote = (props) => {

    const {quote, author} = props.data;

    return(
        <div className="m-auto">
            <h1 className="text-center px-3">{quote}</h1>
            <h3 className="text-end px-3 text-secondary">~{author}</h3>
        </div>
    )
}

export default Quote;