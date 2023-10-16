import React, { useEffect } from 'react';
import Unauthenticated from './Unauthenticated';
import Authorized from './Authorized';

function CheckAuthentication() {
    const userId = localStorage.getItem("UserId");

    useEffect(() => {
        checkAut();
    }, [userId])

    function checkAut() {
        if (userId) {
            return <Authorized />;
        } else {
            return <Unauthenticated />;
        }
    }

    return checkAut(); // Chame a função diretamente, não dentro de um elemento JSX
}

export default CheckAuthentication;
