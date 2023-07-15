import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const WearDetail = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(0);
    });

    let query = useQuery();

    return (
        <header >
            <h1 className="text-light">Wear Detail</h1>
            {query.get("tokenId")}
        </header>
    );
}

export default WearDetail;

