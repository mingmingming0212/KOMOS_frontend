"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Header from "../components/Header"
import NavBar from "../components/NavBar"

interface Product {
  id: number
  name: string
  imageUrl: string
  price: number
  discount?: number
}

const ShopPage = () => {
  // ✅ 백엔드 없이 더미 데이터로 표시
  const [products] = useState<Product[]>([
    { id: 1, name: "모이스처 메이크업 세트", imageUrl: "/dummy-product1.jpg", price: 120000, discount: 30 },
    { id: 2, name: "스튜디오 파운데이션", imageUrl: "/dummy-product2.jpg", price: 79000, discount: 15 },
    { id: 3, name: "시카플러스 밤", imageUrl: "/dummy-product3.jpg", price: 40000, discount: 20 },
    { id: 4, name: "너리싱 샴푸 세트", imageUrl: "/dummy-product4.jpg", price: 138000, discount: 25 },
  ])

  return (
    <main className="min-h-screen bg-gray-100 font-pretendard">
      {/* ✅ 최상단 공지 */}
      <div className="w-full bg-komos-navy text-white text-center py-2 text-sm">
        코모스 웹사이트 - 새로운 이벤트를 확인하세요!
      </div>

      {/* ✅ 헤더 (상단) */}
      <Header />

      {/* ✅ 네비게이션 바 */}
      <NavBar />

      {/* ✅ 상품 리스트 (헤더 아래 배치) */}
      <motion.div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-komos-navy text-center mb-10">Shop</h1>

        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <Link href={`/shop/${product.id}`} className="block">
                <div className="relative w-full aspect-square">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h2 className="mt-3 text-lg font-semibold text-gray-800">{product.name}</h2>

                {/* 🔥 가격 & 할인 표시 */}
                <div className="mt-2 flex items-center space-x-2">
                  {product.discount ? (
                    <>
                      <span className="text-gray-500 line-through text-sm">
                        {product.price.toLocaleString()}원
                      </span>
                      <span className="text-red-500 font-bold">
                        {(product.price * (1 - product.discount / 100)).toLocaleString()}원
                      </span>
                      <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded">
                        -{product.discount}%
                      </span>
                    </>
                  ) : (
                    <span className="text-gray-900 font-semibold">{product.price.toLocaleString()}원</span>
                  )}
                </div>
              </Link>

              {/* 🛒 장바구니 버튼 */}
              <motion.button
                className="mt-3 w-full bg-komos-navy text-white py-2 rounded-lg hover:bg-opacity-90 transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                장바구니 담기
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}

export default ShopPage
