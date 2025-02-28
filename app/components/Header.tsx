"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Heart, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <motion.div className="bg-white shadow-md">
      <div className="container mx-auto px-4 w-[70%] flex items-center justify-between py-4">
        {/* 왼쪽 로고 (공간 유지) */}
        <div className="w-[150px] flex-shrink-0">
          <motion.h1
            className="text-3xl font-bold text-komos-navy cursor-pointer"
            whileHover={{ scale: 1.05, color: "#1E3A8A" }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => (window.location.href = "/")}
          >
            KOMOS
          </motion.h1>
        </div>

        {/* ✅ 검색창 위치 조정 */}
        <div className="flex-1 flex justify-center relative">
          <div className="relative w-[60%] max-w-lg translate-x-8"> {/* ✅ 검색창 살짝 오른쪽으로 이동 */}
            <input
              type="text"
              placeholder="검색"
              className="w-full rounded-full border border-gray-300 bg-transparent py-2 pl-4 pr-10 text-gray-900 placeholder-gray-500 focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* 오른쪽 아이콘 (고정된 공간 차지) */}
        <div className="w-[200px] flex items-center justify-end space-x-4">
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
  );
};

export default Header;
