import Navbar from "../layout/Navbar"
import Topbar from "../layout/Topbar"

const Header = () => {
  return (
    <header className="border-b border-gray-500">
      <Topbar />
      <Navbar />
    </header>
  )
}

export default Header
