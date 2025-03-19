"use client";

import { useState } from "react"; 
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { AiOutlineShoppingCart } from "react-icons/ai"; // 🛒 쇼핑카트 아이콘 가져오기

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discount?: number;
}

const ShopPage = () => {
  // ✅ 백엔드 없이 더미 데이터로 표시
  const [products] = useState<Product[]>([
    { id: 1, name: "코모스 랜드야드", imageUrl: "/images/product1.png", price: 12000, discount: 25 },
    { id: 2, name: "코모스 네임텐트", imageUrl: "/images/product2.png", price: 7000, discount: 10 },
    { id: 3, name: "코모스 반팔셔츠", imageUrl: "/images/product3.png", price: 25000, discount: 20 },
    { id: 4, name: "코모스 뱃지", imageUrl: "/images/product4.png", price: 15000, discount: 25 },
  ]);

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

      {/* ✅ 상품 리스트 */}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-komos-navy text-center mb-10">Shop</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

              {/* 🛒 장바구니 버튼 (아이콘 왼쪽 배치) */}
              <motion.button
                className="mt-3 w-full bg-komos-navy text-white py-2 rounded-lg flex items-center justify-center gap-2 
                           hover:bg-opacity-90 transition"
                whileHover={{ scale: 0.85 }}
                whileTap={{ scale: 0.75 }}
              >
                <AiOutlineShoppingCart size={20} />  {/* 🛒 쇼핑카트 아이콘 */}
                담기
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShopPage;

