import Link from "next/link";
import BoardBanner from "../components/BoardBanner";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import PostList from "../components/PostList";
import { PostButton } from "../components/ui/PostButton";

export default function BoardPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F5] font-pretendard">
      {/* 최상단 공지 */}
      <div className="w-full bg-komos-navy text-white text-center py-2 text-sm">
        코모스 웹사이트 - 새로운 이벤트를 확인하세요!
      </div>

      {/* 헤더 */}
      <Header />

      {/* 네비게이션 바 */}
      <NavBar />

      {/* 게시판 배너 */}
      <section className="w-full">
        <BoardBanner />
      </section>


      {/* 📌 게시글 리스트 + 글쓰기 버튼을 감싸는 container */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <PostList />

        {/* 📌 글쓰기 버튼 - 오른쪽 정렬 */}
        <div className="flex justify-end mt-6">
          <Link href="/createPost">
            <PostButton className="bg-[var(--button-bg)] hover:bg-[var(--accent)] text-[var(--button-text)] px-6 py-3 rounded-md shadow-md">
              글쓰기
            </PostButton>
          </Link>
        </div>
      </div>
    </main>
  );
}
