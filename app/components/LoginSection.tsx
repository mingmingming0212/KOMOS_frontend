"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginSection = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; credit: number } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser({ username: data.username, credit: data.credit }))
        .catch(() => setUser(null));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <motion.div
      className="w-full lg:w-80 bg-white rounded-lg shadow-md p-8 flex flex-col justify-center"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {user ? (
        // ✅ 로그인 상태 UI
        <div className="text-center">
          <p className="text-xl font-semibold text-komos-navy flex justify-center items-center">
            <span className="mr-2">👤</span> {user.username}님 환영합니다!
          </p>

          <div className="mt-4 space-y-2">
            <div className="text-gray-700">💰 보유 포인트: <span className="font-semibold">{user.credit}P</span></div>

            <Link href="/profile">
              <button className="w-full bg-komos-navy text-white py-2 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200">
                내 정보
              </button>
            </Link>

            <Link href="/activity">
              <button className="w-full bg-gray-200 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-300 transition-colors duration-200">
                나의 활동
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition-colors duration-200"
            >
              로그아웃
            </button>
          </div>
        </div>
      ) : (
        // ✅ 로그아웃 상태 UI (기존 로그인 창)
        <>
          <Link href="/login">
            <motion.button
              className="w-full rounded-lg bg-komos-navy px-6 py-3 text-white text-lg font-semibold hover:bg-opacity-90 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              KOMOS 로그인
            </motion.button>
          </Link>
          <div className="mt-6 text-sm text-center">
            <Link href="/reset-password" className="text-komos-navy hover:underline">
              아이디/비밀번호 찾기
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/register" className="text-komos-navy hover:underline">
              회원가입
            </Link>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default LoginSection;
