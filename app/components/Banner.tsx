"use client"

import { motion } from "framer-motion"

const Banner = () => {
  return (
    <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-md">
      <img
        src="/banner.jpg"
        alt="KOMOS 배너"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" /> {/* 배너 불투명도 설정 */}
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center" // 기존 p-12 → px-16으로 변경
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white">
          <h2 className="mb-4 text-5xl font-bold">이달의 코모스인</h2>
          <p className="mb-6 text-xl">이달의 코모스인을 만나보세요!</p>
        </div>
      </motion.div>
    </div>
  )
}

export default Banner
