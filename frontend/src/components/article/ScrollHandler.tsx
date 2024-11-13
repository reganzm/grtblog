'use client'

import { useEffect } from 'react'

export default function ScrollHandler() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash && target.origin === window.location.origin) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          const navbarHeight = 64 // 避开导航栏高度
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - navbarHeight - 20 // 额外 20px 用于视觉填充

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })

          // 添加焦点和模糊效果
          element.classList.add('anchorFocus')
          setTimeout(() => {
            element.classList.remove('anchorFocus')
          }, 2000)
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
