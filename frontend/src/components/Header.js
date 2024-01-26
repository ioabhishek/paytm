import Image from "next/image"

const Header = () => {
  return (
    <header className=" flex items-center justify-between h-16 border-b">
      <h2 className=" font-semibold text-lg">Payment App</h2>
      <div className=" ml-auto"></div>
      <span className=" text-sm font-medium">Hello, Abhishek</span>
      {/* <span className=" text-sm font-medium ml-4">Edit profile</span> */}

      <button className=" bg-black border text-white text-base font-medium px-4 py-1 ml-4 rounded-lg hover:bg-black/80">
        Sign Out
      </button>
    </header>
  )
}

export default Header
