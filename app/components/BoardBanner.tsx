"use client";

import { motion } from "framer-motion";

const BoardBanner = () => {
  return (
    <div className="relative h-52 w-full overflow-hidden rounded-lg shadow-md">
      {/* 기존 배너보다 height를 2/3로 줄임 (h-80 → h-52) */}
      <img
        src="/banner.jpg"
        alt="KOMOS 게시판 배너"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30" /> {/* 배너 불투명도 설정 */}
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-white">
          <h2 className="mb-4 text-4xl font-bold text-center">공지 / 게시글</h2>
          <p className="mb-6 text-lg text-center">공지사항 및 게시글</p>
        </div>
      </motion.div>
    </div>
  );
};

export default BoardBanner;