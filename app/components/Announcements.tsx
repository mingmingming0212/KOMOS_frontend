"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/announcements") // Spring Boot API 호출
      .then((response) => response.json())
      .then((data) => setAnnouncements(data))
      .catch((error) => console.error("Error fetching announcements:", error));
  }, []);

  return (
    <motion.div className="w-full bg-white p-6 rounded-lg shadow-md border border-komos-navy/20">
      <h3 className="mb-4 text-2xl font-semibold text-komos-navy">공지사항</h3>
      <ul className="space-y-2">
        {announcements.map((announcement, index) => (
          <motion.li key={index} className="cursor-pointer text-gray-700 hover:text-komos-navy transition-all duration-200">
            <span className="mr-2 text-komos-navy">•</span> {announcement}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Announcements;
