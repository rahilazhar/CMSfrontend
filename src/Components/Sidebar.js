import React, { useState, useEffect } from 'react'
import { BsArrowLeftShort, BsChevronDown } from 'react-icons/bs'
import { AiFillEnvironment } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { RiDashboardFill } from 'react-icons/ri'
import { Menue } from '../Components/Menu'
import Router from '../Components/Router'
import { Link } from 'react-router-dom'



const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const [submenueopen, setSubmenueopen] = useState(false)
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const role = user.role !== undefined ? user.role.toString() : null;
    setMenuItems(Menue(role));
  }, []);

  console.log(menuItems, 'menu')



  return (
    <>

      <div className='flex'>

        <div className={`${open ? "w-72" : "w-20"} bg-purple-500 duration-300`}>
          <div className={` bg-light-whit h-screen p-5 pt-8 ${open ? "w-72" : "w-20"}  duration-300 relative`}>
            <BsArrowLeftShort className={`bg-white text-3xl text-purple-950 rounded-full absolute -right-3 top-9 border border-purple-950  cursor-pointer duration-300 z-10 ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />

            <div className=' inline-flex'>
              <AiFillEnvironment className={`bg-amber-300 text-4xl rounded block float-left cursor-pointer mr-2 duration-500 ${open && " rotate-[360deg]"}`} />
              <h1 className={`text-white font-medium  cursor-pointer origin-left text-2xl duration-300 ${!open && ' scale-0'}`}>CMS</h1>
            </div>

            <div className={`flex items-center rounded-md bg-light-white px-4 py-2 mt-6 ${!open ? 'px-2.5' : 'px-4'
              }`}>
              <AiOutlineSearch className={`text-lg float-left block cursor-pointer  text-white ${open && "mr-2"}`} />
              <input type={"search"} placeholder='Search' className={`text-base bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`} />
            </div>

            <ul className=' pt-2'>

              {menuItems.map((items, index) => (
                !items.hidden && (
                  <>
                    <li key={index} className={` text-gray-300 flex items-center text-sm gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${items.spacing ? "mt-9" : "mt-2"}`}>
                      <span><RiDashboardFill /></span>
                      <span className={`font-medium text-base flex-1 duration-200 ${!open && " hidden"}`}>  <Link to={items.link}>{items.title}</Link></span>

                      {items.submenue && open && (
                        <BsChevronDown className={` duration-300 ${submenueopen && "rotate-180"}`} onClick={() => setSubmenueopen(!submenueopen)} />
                      )}
                    </li>

                    {items.submenue && submenueopen && open && (
                      <ul>

                        {items.submenueitems.map((sub, index) => (
                          <li key={index} className='  duration-300 text-gray-300 flex items-center text-sm gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                            <Link to={sub.link}>{sub.title}</Link>
                          </li>
                        ))}

                      </ul>

                    )}
                  </>
                )
              )

              )}

            </ul>

          </div>

        </div>
        <Router />
      </div>

    </>
  )
}

export default Sidebar
