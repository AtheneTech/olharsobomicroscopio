import { Outlet } from "react-router-dom"

const HomeLayout = () => {
  return (
    <div>
      {/* Aqui vai ficar a navbar */}

        <Outlet/>

      {/* Aqui vai ficar o footer */}
    </div>
  )
}

export default HomeLayout