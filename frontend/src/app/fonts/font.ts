// import {Edu_AU_VIC_WA_NT_Hand, Noto_Serif_SC, Varela_Round} from 'next/font/google';
// import {Noto_Sans_SC} from 'next/font/google';
// import {Playwrite_US_Modern} from 'next/font/google';
// import {JetBrains_Mono} from 'next/font/google';
// import {Nunito_Sans} from 'next/font/google';


import localFont from "next/font/local";

export const varela_round = localFont({
    src: "./VarelaRound-Regular.woff2",
    weight: "400",
});

export const noto_sans_sc = localFont({
    src: "./NotoSansSC-Regular.woff2",
    weight: "400",
})

export const noto_sans_sc_bold = localFont({
    src: "./NotoSansSC-Bold.woff2",
    weight: "700",
})

export const playwrite_us_modern = localFont({
    src: "./PlaywriteUSModern-Regular.woff2",
    weight: "400",
})

export const jetbrains_mono = localFont({
    src: "./JetBrainsMono-Regular.woff2",
    weight: "400",
})

export const article_font = localFont({
    src: "./NunitoSans-Regular.woff2",
    weight: "400",
    fallback: ["Noto Sans SC"]
})

export const error_font = localFont({
    src: "./EduAUVICWAHand-Regular.woff2",
    weight: "700",
})

export const noto_serif_sc_bold = localFont({
    src: "./NotoSerifSC-600.woff2",
    weight: "600",
})

export const moment_font = localFont({
    src: "./NotoSerifSC-300.woff2",
    weight: "300",
})

export const title_font = localFont({
    src: "./NotoSerifSC-600.woff2",
    weight: "600",
})

