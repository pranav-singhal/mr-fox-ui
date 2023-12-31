import React from "react";
import TotalValueChart from "../TotalValueChart";

const ShowPortfolioGraph = (props: any) => {

    const data = props?.args?.data;

    if (data) {
        return <TotalValueChart data={data} />
    }

    return <div>Looks like I was not able to analyse your portfolio. Please try again</div>;
};

export default ShowPortfolioGraph;