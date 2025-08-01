import { Outlet } from "react-router-dom"
import Header from '../components/Header'

const HomeLayout = () => {
  return (
    <div>

        <Outlet/>

      {/* Aqui vai ficar o footer */}
    </div>
  )
}

export default HomeLayout