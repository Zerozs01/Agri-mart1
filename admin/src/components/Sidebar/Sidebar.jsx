import { NavLink } from 'react-router-dom'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option" title="Add Item">
                <img src={assets.add_icon} alt="Add" />
                <p>Add Item</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option" title="List Item">
                <img src={assets.order_icon} alt="List" />
                <p>List Item</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option" title="Orders">
                <img src={assets.order_icon} alt="Orders" />
                <p>Orders</p>
            </NavLink>
            <NavLink to='/users' className="sidebar-option" title="จัดการผู้ใช้">
                <img src={assets.user_icon} alt="Users" />
                <p>จัดการผู้ใช้</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar