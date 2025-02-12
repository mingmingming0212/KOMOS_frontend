"use client"

import { motion } from "framer-motion"
import { Search, MapPin, Heart, ShoppingCart, User } from "lucide-react"

const Header = () => {
  return (
    <motion.div className="bg-white shadow-md">
      <div className="container mx-auto px-4 w-[70%] flex items-center justify-between py-4">
        {/* KOMOS 로고 */}
        <h1 className="text-3xl font-bold text-komos-navy">KOMOS</h1>

        {/* 검색창 */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="검색"
              className="w-full rounded-full border border-gray-300 bg-transparent py-2 pl-4 pr-10 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* 아이콘 목록 */}
        <div className="flex items-center space-x-4">
          {[MapPin, Heart, ShoppingCart, User].map((Icon, index) => (
            <motion.div
              key={index}
              className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="h-6 w-6 text-gray-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Header
