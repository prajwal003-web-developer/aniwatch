"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Film, Tv, Clapperboard, Search } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const [isShowing, setisShowing] = useState(false)

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: Home,
    },
    {
      name: "Movies",
      link: "/movies",
      icon: Film,
    },
    {
      name: "Tv",
      link: "/tv",
      icon: Tv,
    },
    {
      name: "Anime",
      link: "/anime",
      icon: Clapperboard,
    },
  ];

  if(pathname.startsWith("/watch")){
    return null
  }

  return (
    <div className="flex p-2   justify-center items-center h-24 fixed z-30 bottom-0 md:top-0 left-0 right-0">
      <div className="p-4 h-full bg-gradient-to-l backdrop-blur-xs from-[#ffc0cb23] to-[#ffa6001e]  shadow shadow-gray-500 rounded w-full md:w-[38rem]">
        <div className="flex justify-between items-center h-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;

            return (
              <Link
                key={item.name}
                href={item.link}
                className={`flex justify-center gap-1 items-center flex-1 text-sm transition ${
                  isActive ? "text-orange-400  shadow shadow-gray-600 bg-[#80808031] rounded py-4 " : "text-gray-300"
                }`}
              >
                <Icon size={20} />
                <span className="hidden md:block">{item.name}</span>
              </Link>
            );
          })}
          <button
            onClick={()=>{
                setisShowing(true)
            }}
            className={`flex mx-2 justify-center gap-1 items-center text-sm transition cursor-pointer`}
          >
            <Search size={20} />
            <span className="hidden md:block">Search</span>
          </button>
        </div>
      </div>
      { isShowing &&
        <SearchBox setisShowing={setisShowing}/>
      }
    </div>
  );
};

export default Navbar;

const SearchBox = ({setisShowing})=>{

    const router = useRouter()

    const HandleSubmit =(e)=>{
        e.preventDefault()

        const Query = e.target.Query.value

        console.log(Query)

        router.push(`/search/${Query}`)

        setisShowing(false)        
    }

    
    return(
        <div onClick={()=>{
            setisShowing(false)
        }} className="fixed z-50  inset-0  backdrop-blur-2xl p-4 flex justify-center items-center">
            <form onClick={(e)=>{e.stopPropagation()}} onSubmit={HandleSubmit} className="md:w-[33rem] w-full bg-[#ffffff17] rounded-xl flex justify-center items-center border-solid border border-gray-300 p-4">
                <input name="Query" type="text" placeholder="Search here" className="flex-1 p-2 outline-none border-none" />
                <button
                type="submit"
                className="cursor-pointer"
                >
                    <Search size={30}/>
                </button>
            </form>
        </div>
    )
}
