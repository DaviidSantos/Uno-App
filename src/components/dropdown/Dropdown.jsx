import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import './dropdown.css'

const Dropdown = ({dropdownItems}) => {

    const [dropdown, setDropdown] = useState(false);

    return (
        <div className={dropdown ? dropdownItems.container_name_click : dropdownItems.container_name} onClick={() => setDropdown(!dropdown)} >
            {
                dropdownItems.submenu_items.map((dropdownItem) => (
                    <Link key={dropdownItem.id} to={dropdownItem.path} id={dropdownItem.cName} onClick={() => setDropdown(!dropdown)}>{dropdownItem.title}</Link>
                ))
            }
        </div>
    )
}

export default Dropdown