"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User, CreditCard, BookOpen } from "lucide-react"; // ✅ 아이콘 수정

interface User {
  username: string;
  credit: number;
  avatarUrl?: string;
}

const LoginSection = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:8080/api/auth/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) =>
          setUser({ username: data.username, credit: data.credit, avatarUrl: data.avatarUrl || "" })
        )
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
      className="w-full lg:w-[380px] bg-white shadow-sm border border-gray-200 p-6 rounded-md flex flex-col justify-center items-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {user ? (
        <div className="flex flex-col w-full space-y-2">
          {/* ✅ 프로필 영역 (사진 + 유저이름 + 크레딧) */}
          <div className="flex items-center justify-between">
            {/* 유저 프로필 + 이름 */}
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold text-white overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl || "/placeholder.svg"} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  user.username.slice(0, 2).toUpperCase()
                )}
              </div>
              <h2 className="font-semibold text-lg text-komos-navy">{user.username}</h2>
            </div>

            {/* 크레딧 (오른쪽 끝) */}
            <div className="flex items-center text-komos-navy space-x-1">
              <CreditCard className="h-4 w-4" />
              <span className="font-semibold text-komos-navy text-sm">{user.credit}P</span>
            </div>
          </div>

          {/* ✅ 내 정보 / 나의 활동 (왼쪽 정렬) + 로그아웃 (오른쪽 정렬) */}
          <div className="flex w-full items-center">
            {/* 내 정보 & 나의 활동 (왼쪽 정렬) */}
            <div className="flex space-x-4 text-komos-navy font-medium text-sm">
              <Link href="/profile" className="hover:underline flex items-center">
                <User className="h-4 w-4 mr-1" />
                내 정보
              </Link>
              <Link href="/activity" className="hover:underline flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                나의 활동
              </Link>
            </div>

            {/* ✅ 로그아웃 버튼 (오른쪽 정렬) */}
            <motion.button
              onClick={handleLogout}
              className="px-3 py-1 text-white border border-komos-navy rounded-full text-xs hover:bg-opacity-90 transition flex items-center bg-komos-navy ml-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-4 w-4 mr-1" />
              로그아웃
            </motion.button>
          </div>
        </div>
      ) : (
        // ✅ 로그아웃 상태 UI (박스 크기 확대)
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full text-center"
        >
          <Link href="/login">
            <motion.button
              className="w-full rounded-lg bg-komos-navy px-4 py-3 text-white text-sm font-semibold hover:bg-opacity-90 transition-colors duration-200 shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              KOMOS 로그인
            </motion.button>
          </Link>
          <div className="mt-4 text-sm text-center">
            <Link href="/reset-password" className="text-komos-navy hover:underline">
              아이디/비밀번호 찾기
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link href="/register" className="text-komos-navy hover:underline">
              회원가입
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoginSection;
