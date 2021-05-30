import { CSSProperties } from "react"

export function addUnitPx(value?: string | number): string | undefined {
  if (value === undefined) {
    return undefined
  }
  return `${unitToPx(value)}px`
}

export function getZIndexStyle(zIndex?: string | number) {
  const style: CSSProperties = {}
  if (zIndex !== undefined) {
    style.zIndex = +zIndex
  }
  return style
}

// cache
let rootFontSize: number

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement
    const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize

    rootFontSize = parseFloat(fontSize)
  }

  return rootFontSize
}

function convertPx(value: string) {
  value = value.replace(/px/g, "")
  return +value
}

function convertRem(value: string) {
  value = value.replace(/rem/g, "")
  return +value * getRootFontSize()
}

function convertVw(value: string) {
  value = value.replace(/vw/g, "")
  return (+value * window.innerWidth) / 100
}

function convertVh(value: string) {
  value = value.replace(/vh/g, "")
  return (+value * window.innerHeight) / 100
}

export function unitToPx(value: string | number): number {
  if (typeof value === "number") {
    return value
  }

  if (value.includes("px")) {
    return convertPx(value)
  }
  if (value.includes("rem")) {
    return convertRem(value)
  }
  if (value.includes("vw")) {
    return convertVw(value)
  }
  if (value.includes("vh")) {
    return convertVh(value)
  }

  return parseFloat(value)
}
