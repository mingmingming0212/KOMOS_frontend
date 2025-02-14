"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // 에러 초기화

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("로그인 실패! 아이디 또는 비밀번호를 확인하세요.");
      }

      const data = await response.json();
      console.log("로그인 성공:", data);

      localStorage.setItem("token", data.token); // ✅ JWT 저장
      router.push("/"); // ✅ 로그인 성공 후 홈페이지로 이동
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] font-pretendard">
      {/* 로그인 컨테이너 */}
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* KOMOS 로고 (홈으로 이동) */}
        <Link href="/">
          <motion.h1
            className="text-4xl font-bold text-komos-navy mb-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            KOMOS
          </motion.h1>
        </Link>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 아이디 입력 */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="아이디"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-komos-navy"
            required
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-komos-navy"
            required
          />

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* 로그인 버튼 */}
          <motion.button
            type="submit"
            className="w-full bg-komos-navy text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            로그인
          </motion.button>
        </form>

        {/* 구분선 */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-sm">또는</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* 아이디/비밀번호 찾기 & 회원가입 */}
        <div className="text-center text-sm">
          <Link href="/reset-password" className="text-komos-navy hover:underline">
            아이디/비밀번호 찾기
          </Link>
          <span className="mx-2 text-gray-400">|</span>
          <Link href="/register" className="text-komos-navy hover:underline">
            회원가입
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
