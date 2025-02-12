import localFont from "next/font/local"

const circularWebBook = localFont({
    src: './../../public/fonts/circularweb-book.woff2',
    display: 'swap',
    variable: '--circular-web'
})

const general = localFont({
    src: "./../../public/fonts/general.woff2",
    display: 'swap',
    variable: '--general'
})

const robertMedium = localFont({
    src: "./../../public/fonts/robert-medium.woff2",
    display: 'swap',
    variable: '--robert-medium'
})

const robertRegular = localFont({
    src: "./../../public/fonts/robert-regular.woff2",
    display: 'swap',
    variable: '--robert-regular'
})

const zentryRegular = localFont({
    src: "./../../public/fonts/zentry-regular.woff2",
    display: 'swap',
    variable: '--zentry-regular',
})

const fonts = {
    circularWebBook,
    general,
    robertMedium,
    robertRegular,
    zentryRegular
}

type FontNames = keyof typeof fonts;

export const getFontCls = (fontName: FontNames) => {
    return fonts[fontName].className;
}
