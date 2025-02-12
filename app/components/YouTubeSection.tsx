"use client"

import { motion } from "framer-motion"

const YouTubeSection = () => {
  return (
    <motion.div
      className="w-full h-full bg-white p-6 rounded-lg shadow-md border border-komos-navy/20 flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="mb-4 text-xl font-semibold text-komos-navy">코모스 공식 유튜브</h3>
      <div className="grid grid-cols-2 gap-2 mb-8">
        {[1, 2].map((index) => (
          <motion.div
            key={index}
            className="aspect-video w-full overflow-hidden rounded-lg bg-gray-200 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={`/placeholder.svg?height=200&width=300&text=YouTube+Thumbnail+${index}`}
              alt={`YouTube Thumbnail ${index}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
      </div>
      
      {/* 🔥 이달의 이벤트도 유튜브 섹션 내부에서 정렬 */}
      <div className="border-t border-komos-navy/20 pt-6 flex flex-col">
        <h4 className="mb-4 text-xl font-semibold text-komos-navy">이달의 이벤트</h4>
        <motion.div
          className="aspect-[21/9] w-full overflow-hidden rounded-lg bg-gray-200 shadow-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="/placeholder.svg?height=300&width=700&text=Event+Promotion"
            alt="Event Promotion"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default YouTubeSection
