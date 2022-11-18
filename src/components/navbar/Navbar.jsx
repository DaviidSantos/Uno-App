import React, { useState } from 'react'
import './navbar.css'
import logo from '../../assets/Logo.svg'
import { navItems, solicitanteDropdown, solicitacaoDeAnaliseDropdown, amostraDropdown} from '../navitem/Navitem'
import { Link } from 'react-router-dom'
import Dropdown from '../dropdown/Dropdown'


const Navbar = () => {

    const [dropdownSolicitante, setDropdownSolicitante] = useState(false)
    const [dropdownSA, setDropdownSA] = useState(false)
    const [dropdownAmostra, setDropdownAmostra] = useState(false)

    let solicitante_submenu ={
        submenu_items: solicitanteDropdown,
        container_name: 'solicitante__submenu scale-up-center',
        container_name_click: 'solicitante__submenu scale-up-center clicked'
    }

    let sa_submenu ={
        submenu_items: solicitacaoDeAnaliseDropdown,
        container_name: 'sa__submenu scale-up-center',
        container_name_click: 'sa__submenu scale-up-center clicked'
    }

    let amostra_submenu ={
        submenu_items: amostraDropdown,
        container_name: 'amostra__submenu scale-up-center',
        container_name_click: 'amostra__submenu scale-up-center clicked'
    }

    return (
        <div className="navbar">
            <nav className="navbar__container">
                <div className="navbar__container-logo">
                    <Link to='/'><img src={logo} alt="Logo" /></Link>
                </div>
                <div className="navbar__container-links">
                    {
                        navItems.map((navItem) => {
                            if(navItem.title === 'Solicitante'){
                                return(
                                    <div className="navbar__container-links_item" key={navItem.id} onMouseEnter={() => setDropdownSolicitante(true)} onMouseLeave={() => setDropdownSolicitante(false)}>
                                        <span className={navItem.cName}>{navItem.title}</span>
                                        {dropdownSolicitante && <Dropdown dropdownItems={solicitante_submenu}/>}
                                    </div>
                                )
                            }

                            if(navItem.title === 'Solicitação de Análise'){
                                return(
                                    <div className="navbar__container-links_item" key={navItem.id} onMouseEnter={() => setDropdownSA(true)} onMouseLeave={() => setDropdownSA(false)}>
                                        <span className={navItem.cName}>{navItem.title}</span>
                                        {dropdownSA && <Dropdown dropdownItems={sa_submenu}/>}
                                    </div>
                                )
                            }

                            if(navItem.title === 'Amostra'){
                                return(
                                    <div className="navbar__container-links_item" key={navItem.id} onMouseEnter={() => setDropdownAmostra(true)} onMouseLeave={() => setDropdownAmostra(false)}>
                                        <span className={navItem.cName}>{navItem.title}</span>
                                        {dropdownAmostra && <Dropdown dropdownItems={amostra_submenu}/>}
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </nav>
        </div>
    )
}

export default Navbar