"use client"

import { motion } from "framer-motion"

const LoginSection = () => {
  return (
    <motion.div
      className="
        w-full lg:w-80  /* Full width, but 320px on large screens */
        h-40            /* 384px height */
        bg-komos-lightGray  /* Background color */
        rounded-lg shadow-md  /* Rounded edges & shadow */
        p-8            /* Adds 32px padding inside */
        flex flex-col justify-center  /* Centers content vertically */
      "
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="w-full rounded-lg bg-komos-navy px-6 py-3 text-white text-lg font-semibold hover:bg-opacity-90 transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        KOMOS 로그인
      </motion.button>
      <div className="mt-6 text-sm text-center">
        <a href="#" className="text-komos-navy hover:underline">
          아이디/비밀번호 찾기
        </a>
        <span className="mx-2 text-gray-400">|</span>
        <a href="#" className="text-komos-navy hover:underline">
          회원가입
        </a>
      </div>
    </motion.div>
  )
}

export default LoginSection

