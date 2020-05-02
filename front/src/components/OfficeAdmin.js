import React, {useState} from 'react';
import { withRouter} from 'react-router-dom';


const OfficeAdmin = () => {

    const [message] = useState("Whatsup l'admin ?")

    return(
        <div>
        <h1>OfficeAdmin</h1>
        <p> {message}</p>
        </div>
    )
}

export default withRouter(OfficeAdmin)