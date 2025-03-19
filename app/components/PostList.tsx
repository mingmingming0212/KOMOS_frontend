"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

const PostList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [announcementPosts, setAnnouncementPosts] = useState<Post[]>([]);
  const [generalPosts, setGeneralPosts] = useState<Post[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [hideAnnouncements, setHideAnnouncements] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/api/posts?page=${currentPage - 1}&size=15`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`서버 응답 오류: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setAnnouncementPosts(data.announcementPosts || []);
        setGeneralPosts(data.generalPosts || []);
        setTotalPages(data.totalPages || 1);
      })
      .catch((error) => {
        console.error("게시글 불러오기 실패:", error);
        setAnnouncementPosts([]);
        setGeneralPosts([]);
        setTotalPages(1);
      });
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`?page=${newPage}`);
    }
  };

  return (
    <div className="max-w-[900px] mx-auto px-4 py-6 bg-[#F5F5F5]">
      {/* 게시판 제목 */}
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-lg font-medium text-komos-navy">전체 글 보기</h2>
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <label>
            <input
              type="checkbox"
              className="mr-1"
              checked={hideAnnouncements}
              onChange={() => setHideAnnouncements(!hideAnnouncements)}
            />
            공지 숨기기
          </label>
        </div>
      </div>

      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-komos-navy text-white">
            <th className="p-2 text-center w-12">번호</th>
            <th className="p-2">제목</th>
            <th className="p-2 text-center w-24">작성자</th>
            <th className="p-2 text-center w-24">작성일</th>
          </tr>
        </thead>

        {/* 📌 공지글 리스트 (최신 3개만) */}
        {!hideAnnouncements && announcementPosts.length > 0 && (
            <tbody>
              {announcementPosts.slice(0, 3).map((post) => (
                <tr key={post.id} className="border-b bg-gray-100 font-medium">
                  <td className="p-2 text-center text-red-600 font-bold">공지</td>
                  <td className="p-2">
                    <a href={`/posts/${post.id}`} className="text-red-600 hover:underline">
                      {post.title}
                    </a>
                  </td>
                  <td className="p-2 text-center">{post.author}</td>
                  <td className="p-2 text-center">{new Date(post.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
        )}

        {/* 📌 일반 게시글 리스트 */}

        <tbody>
          {generalPosts.length > 0 ? (
            generalPosts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-100">
                <td className="p-2 text-center">{post.id}</td>
                <td className="p-2">
                  <a href={`/posts/${post.id}`} className="text-komos-navy hover:underline">
                    {post.title}
                  </a>
                </td>
                <td className="p-2 text-center">{post.author}</td>
                <td className="p-2 text-center">{new Date(post.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                게시글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>


  );
};

export default PostList;
