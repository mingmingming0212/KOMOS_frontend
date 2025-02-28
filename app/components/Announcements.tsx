"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Announcement {
  id: number;
  title: string;
  createdAt: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/posts/announcements")
      .then((response) => response.json())
      .then((data) => setAnnouncements(data || [])) // ✅ 빈 배열 기본값 처리
      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);

  return (
    <motion.div className="w-full bg-white p-6 rounded-lg shadow-md border border-komos-navy/20">
      <h3 className="mb-4 text-2xl font-semibold text-komos-navy">공지사항</h3>
      <ul className="space-y-2">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <motion.li
              key={announcement.id}
              className="cursor-pointer text-gray-700 hover:text-komos-navy transition-all duration-200"
            >
              <span className="mr-2 text-komos-navy">•</span>
              <a href={`/posts/${announcement.id}`} className="hover:underline">
                {announcement.title}
              </a>
              <span className="ml-2 text-gray-500 text-sm">({announcement.createdAt})</span>
            </motion.li>
          ))
        ) : (
          <li className="text-gray-500">등록된 공지사항이 없습니다.</li>
        )}
      </ul>
    </motion.div>
  );
};

export default Announcements;
