import Header from "./components/Header"
import Banner from "./components/Banner"
import LoginSection from "./components/LoginSection"
import Announcements from "./components/Announcements"
import YouTubeSection from "./components/YouTubeSection"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F5]">
      <Header />

      {/* ✅ 배너 + 로그인 → 같은 행에 배치 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4 w-[85%] mx-auto">
          <div className="w-1/4">
            <Banner />
          </div>
          <div className="w-1/4">
            <LoginSection />
          </div>
        </div>
      </div>

      {/* ✅ 공지사항 + 유튜브 → 배너와 동일한 너비 유지 */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row gap-6 w-[85%] mx-auto">
          {/* 공지사항 */}
          <div className="w-2/5">
            <Announcements />
          </div>

          {/* 유튜브 + 이벤트 */}
          <div className="w-3/5 flex flex-col gap-6">
            <YouTubeSection />
          </div>
        </div>
      </div>

      <footer className="bg-komos-navy text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <p className="text-center">&copy; 2025 KOMOS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
