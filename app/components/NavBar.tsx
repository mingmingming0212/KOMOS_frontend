"use client"

import Link from "next/link"

const NavBar = () => {
  const navItems = [
    { name: "카테고리", path: "/category" },
    { name: "활동", path: "/activity" },
    { name: "이벤트", path: "/events" },
    { name: "공지/게시글", path: "/notices" },
    { name: "코모스 샵", path: "/shop" },
  ]

  return (
    <nav className="bg-komos-white text-komos-gray py-2 shadow-md">
      <div className="container mx-auto px-4 w-[85%] flex justify-center">
        <ul className="flex space-x-10 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} className="cursor-pointer hover:underline transition-all duration-200">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
