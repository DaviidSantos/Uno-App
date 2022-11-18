import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './dropdown.css'

const Dropdown = (dropdownItems) => {

    const [dropdown, setDropdown] = useState(false);

    return (
        <div>
            {
                dropdownItems.map((dropdownItem) => (
                    <Link to={dropdownItem.path} className={dropdownItem.cName}>{dropdownItem.title}</Link>
                ))
            }
        </div>
    )
}

export default Dropdown