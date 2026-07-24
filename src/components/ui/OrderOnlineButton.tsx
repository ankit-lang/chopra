'use client'

import React from 'react'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'

export default function OrderOnlineButton({ href, className = '' }: { href: string, className?: string }) {
  return (
    <>
      <Link href={href} className={`custom-animated-order-btn shrink-0 ${className}`}>
        <span className="custom-btn-content">
          <ShoppingBag className="w-[18px] h-[18px] mr-2" strokeWidth={2.5} />
          ORDER ONLINE
        </span>
      </Link>
      <style>{`
        .custom-animated-order-btn {
          width: 190px;
          height: 48px;
          border: none;
          border-radius: 9999px;
          background: linear-gradient(to right, #4955f5, #06068a, #4955f5, #06068a, #4955f5, #06068a);
          background-size: 250%;
          background-position: left;
          color: white;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition-duration: 1s;
          overflow: hidden;
          text-decoration: none;
        }

        .custom-btn-content {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          transition-duration: 1s;
          background-color: #0000cc; /* Main blue from image */
          background-size: 200%;
          z-index: 1;
          font-weight: 700;
          letter-spacing: 0.05em;
          font-size: 0.875rem;
        }

        .custom-animated-order-btn:hover {
          background-position: right;
          transition-duration: 1s;
        }

        .custom-animated-order-btn:hover .custom-btn-content {
          background-position: right;
          transition-duration: 1s;
          background-color: #0000b3;
        }

        .custom-animated-order-btn:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  )
}
