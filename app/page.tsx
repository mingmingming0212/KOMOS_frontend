import Header from "./components/Header"
import NavBar from "./components/NavBar"
import Banner from "./components/Banner"
import Announcements from "./components/Announcements"
import YouTubeSection from "./components/YouTubeSection"
import LoginSection from "./components/LoginSection"

export default function Home() {
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

      {/* 배너 (최상단 꽉 채우기) */}
      <section className="w-full">
        <Banner />
      </section>

      {/* 하단 컨텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row gap-6 w-[75%] mx-auto">
          {/* 공지사항 */}
          <div className="w-1/2">
            <Announcements />
          </div>

          {/* 유튜브 + 이벤트 */}
          <div className="w-2/5 flex flex-col gap-6">
            <YouTubeSection />
          </div>

          {/* 로그인 섹션 */}
          <div className="w-1/4">
            <LoginSection />
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-komos-navy text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2025 KOMOS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

export function Category() {
  return (
    <main className="min-h-screen bg-[#FFFFFF] font-pretendard">
      {/* 최상단 공지 */}
      <div className="w-full bg-komos-navy text-white text-center py-2 text-sm">
        코모스 웹사이트 - 새로운 이벤트를 확인하세요!
      </div>

      {/* 헤더 */}
      <Header />

      {/* 네비게이션 바 */}
      <NavBar />

      {/* 배너 (최상단 꽉 채우기) */}
      <section className="w-full">
        <Banner />
      </section>

      {/* 하단 컨텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row gap-6 w-[75%] mx-auto">
          {/* 공지사항 */}
          <div className="w-1/2">
            <Announcements />
          </div>

          {/* 유튜브 + 이벤트 */}
          <div className="w-2/5 flex flex-col gap-6">
            <YouTubeSection />
          </div>

          {/* 로그인 섹션 */}
          <div className="w-1/4">
            <LoginSection />
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <footer className="bg-komos-navy text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2025 KOMOS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}