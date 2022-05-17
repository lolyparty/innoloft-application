import {Link} from 'react-router-dom'
import logo from '../Img/logo (1).svg'

const Header = ()=>{

    const active = (e)=>{
        document.querySelectorAll('a').forEach((item)=>{
            item.classList.remove('active_navitem')

        })
        e.target.className = 'active_navitem'
    }

    return <>
      <header>
        <div className="logo_container">
          <img src={logo} className="logo_img" alt="logo" />
        </div>
      </header>
      <nav>
        <ul className='nav_list' onClick={active}>
            <li className='nav_item' >
                <Link to="/">Main</Link>
            </li>
            <li className='nav_item'>
                <Link to="/product">Product</Link>
            </li>
        </ul>
      </nav>
    </>
}

export {Header}