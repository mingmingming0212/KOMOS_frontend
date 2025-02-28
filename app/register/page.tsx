"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    birthDate: "",
  });
  const [error, setError] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false); // 약관 펼치기 여부
  const [isAgreed, setIsAgreed] = useState(false); // 약관 동의 여부

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isAgreed) {
      setError("이용약관에 동의해야 합니다.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          fullName: formData.fullName,
          birthDate: formData.birthDate,
          institution: "SMU", // ✅ 기본값
          role: "USER", // ✅ 기본값
        }),
      });

      if (!response.ok) {
        throw new Error("회원가입 실패! 입력한 정보를 다시 확인하세요.");
      }

      console.log("회원가입 성공!");
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] font-pretendard">
      <motion.div
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* KOMOS 로고 */}
        <Link href="/">
          <motion.h1
            className="text-3xl font-bold text-komos-navy mb-4 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            KOMOS
          </motion.h1>
        </Link>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="아이디"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-komos-navy"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-komos-navy"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 확인"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-komos-navy"
            required
          />
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="성명"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-komos-navy"
            required
          />
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-komos-navy"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-komos-navy"
            required
          />

          {/* 약관 동의 */}
          <div className="mt-3">
            <div
              className="flex items-center cursor-pointer justify-between p-2 border border-gray-300 rounded-md"
              onClick={() => setIsTermsOpen(!isTermsOpen)}
            >
              <span className="text-gray-700 text-sm">이용약관 동의 (필수)</span>
              <span>{isTermsOpen ? "▲" : "▼"}</span>
            </div>
            {isTermsOpen && (
              <div className="mt-2 p-2 text-gray-600 text-xs border border-gray-200 rounded-md bg-gray-50">
                KOMOS 학생회 웹사이트 회원가입을 통해 여러분의 개인정보가 회원 서비스 운영을 위해 활용될 수 있습니다.
              </div>
            )}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                className="mr-2"
              />
              <label className="text-gray-600 text-sm">이용약관에 동의합니다.</label>
            </div>
          </div>

          {/* 에러 메시지 */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* 회원가입 버튼 */}
          <motion.button
            type="submit"
            className={`w-full text-white py-2 rounded-md font-semibold transition-colors duration-200 ${
              isAgreed ? "bg-komos-navy hover:bg-opacity-90" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isAgreed}
            whileHover={{ scale: isAgreed ? 1.05 : 1 }}
            whileTap={{ scale: isAgreed ? 0.95 : 1 }}
          >
            회원가입
          </motion.button>
        </form>

        {/* 로그인 이동 링크 */}
        <div className="text-center text-sm mt-4">
          <span className="text-gray-500">이미 계정이 있으신가요? </span>
          <Link href="/login" className="text-komos-navy hover:underline">
            로그인
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
