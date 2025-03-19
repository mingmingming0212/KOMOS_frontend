"use client";

import type React from "react";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PostButton } from "../components/ui/PostButton";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import BoardBanner from "../components/BoardBanner";

export default function PostForm() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("GENERAL"); // 기본값 GENERAL
    // const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("로그인이 필요합니다.");
            return;
        }

        const postData = {
            type: category, // ANNOUNCEMENT | GENERAL | ANONYMOUS
            title,
            content,
        };

        try {
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("게시글 등록 실패");
            }

            alert("게시글이 등록되었습니다.");
            router.push("/posts"); // 게시글 리스트 페이지로 이동
        } catch (error) {
            console.error("게시글 등록 실패:", error);
            alert("게시글 등록 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="min-h-screen bg-[var(--background)] font-pretendard">
            <div className="w-full bg-[var(--primary)] text-[var(--button-text)] text-center py-2 text-sm">
                코모스 웹사이트 - 새로운 이벤트를 확인하세요!
            </div>
            <Header />
            <NavBar />
            <BoardBanner />

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="block text-[var(--foreground)] font-bold">
                            제목
                        </label>
                        <Input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-md px-3 py-2 shadow-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="category" className="block text-[var(--foreground)] font-bold">
                            카테고리
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-md px-3 py-2 shadow-sm"
                        >
                            <option value="GENERAL">일반 게시글</option>
                            <option value="ANNOUNCEMENT">공지사항</option>
                            <option value="ANONYMOUS">익명 게시글</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="content" className="block text-[var(--foreground)] font-bold">
                            내용
                        </label>
                        <Textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full min-h-[250px] bg-[var(--card-bg)] border border-[var(--border-color)] rounded-md px-3 py-2 shadow-sm resize-y"
                        />
                    </div>

                    <div className="flex justify-between items-center mt-8">
                        <div className="flex items-center">
                            <input ref={fileInputRef} type="file" id="file" onChange={handleFileChange} className="hidden" multiple />
                            <PostButton
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                파일 선택
                            </PostButton>
                        </div>

                        <PostButton type="submit">
                            등록하기
                        </PostButton>
                    </div>
                </form>
            </main>
        </div>
    );
}
