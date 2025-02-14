"use client"; // ✅ 클라이언트 컴포넌트로 지정

import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<{ username: string; credit: number } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token")?.trim(); // ✅ 공백 제거
    if (!token) return;

    console.log("Token: ", token);

    fetch("http://localhost:8080/api/auth/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid token");
      return res.json();
    })
    .then((data) => {
      setUser({ username: data.username, credit: data.credit });
    })
    .catch(() => {
      console.log("❌ JWT 검증 실패, 토큰 삭제");
      localStorage.removeItem("token"); // ✅ 잘못된 토큰 삭제
      setUser(null);
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, logout };
};
