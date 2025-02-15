import type {Metadata} from "next"
import type React from "react"
import {Container} from "@radix-ui/themes"

export const metadata: Metadata = {
    title: "文章",
    description: "这是所有文章，与你分享我的所思所想。",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div
            className="relative min-h-screen overflow-hidden"
            style={{
                backgroundColor: "var(--background)",
                color: "var(--foreground)",
            }}
        >
            <div
                className="absolute inset-0 z-0"
                style={{
                    content: '""',
                    background: `
                        linear-gradient(to right, rgba(var(--foreground), 0.1)1px, transparent 1px),
                        linear-gradient(to bottom, rgba(var(--foreground), 0.1)1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                    opacity: 0.1,
                    pointerEvents: "none",
                }}
            />
            <div
                className="absolute inset-0 z-10"
                style={{
                    backdropFilter: "blur(5px)",
                    backgroundColor: "rgba(var(--background), 0.7)",
                }}
            />
            <div className="relative z-20">
                <Container
                    size={"4"}
                    style={{
                        padding: "0 20px",
                        scrollBehavior: "smooth",
                    }}
                >
                    {children}
                </Container>
            </div>
        </div>
    )
}

