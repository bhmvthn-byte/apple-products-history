import React from 'react'

// Minimalist line-art product icons inspired by Apple's design language
// All icons share one 64x64 grid, 1.6 stroke, currentColor

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 64 64',
  width: '100%',
  height: '100%',
}

export const MacIcon = () => (
  <svg {...base}>
    <rect x="9" y="12" width="46" height="30" rx="2.5" />
    <line x1="9" y1="20" x2="55" y2="20" />
    <circle cx="32" cy="16" r="0.9" fill="currentColor" stroke="none" />
    <path d="M28.5 42v5h-7.5" />
    <path d="M35.5 42v5h7.5" />
  </svg>
)

export const IPhoneIcon = () => (
  <svg {...base}>
    <rect x="23" y="7" width="18" height="50" rx="4" />
    <line x1="23" y1="13" x2="41" y2="13" />
    <line x1="29" y1="10.5" x2="35" y2="10.5" />
    <line x1="28" y1="52.5" x2="36" y2="52.5" />
  </svg>
)

export const IPadIcon = () => (
  <svg {...base}>
    <rect x="15" y="9" width="34" height="46" rx="3.5" />
    <circle cx="32" cy="50.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
)

export const IPodIcon = () => (
  <svg {...base}>
    <rect x="21" y="7" width="22" height="50" rx="4" />
    <rect x="26" y="12" width="12" height="13" rx="1.5" />
    <circle cx="32" cy="37.5" r="9.5" />
    <circle cx="32" cy="37.5" r="2.6" />
    <circle cx="32" cy="52" r="0.9" fill="currentColor" stroke="none" />
  </svg>
)

export const WatchIcon = () => (
  <svg {...base}>
    <rect x="20" y="17" width="24" height="26" rx="6.5" />
    <path d="M26 17v-6a2 2 0 012-2h8a2 2 0 012 2v6" />
    <path d="M26 43v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
    <line x1="44" y1="26" x2="47" y2="26" />
    <rect x="44" y="26" width="3" height="6" rx="1.2" />
    <circle cx="32" cy="30" r="6.5" />
    <path d="M32 26.5v3.6l2.4 1.6" />
  </svg>
)

export const AirPodsIcon = () => (
  <svg {...base}>
    <circle cx="25" cy="21" r="7.5" />
    <circle cx="39" cy="21" r="7.5" />
    <path d="M22.5 27v15a2.5 2.5 0 005 0V27" />
    <path d="M41.5 27v15a2.5 2.5 0 01-5 0V27" />
    <circle cx="25" cy="21" r="2" fill="currentColor" stroke="none" />
    <circle cx="39" cy="21" r="2" fill="currentColor" stroke="none" />
  </svg>
)

export const TVIcon = () => (
  <svg {...base}>
    <rect x="8" y="14" width="48" height="31" rx="4" />
    <circle cx="32" cy="29.5" r="8" />
    <path d="M29.5 26l6 3.5-6 3.5z" />
    <path d="M23 45v6M41 45v6" />
  </svg>
)

export const HomePodIcon = () => (
  <svg {...base}>
    <path d="M20 22c0-8.5 5.4-14 12-14s12 5.5 12 14v18c0 6.5-5.4 11-12 11s-12-4.5-12-11z" />
    <ellipse cx="32" cy="12" rx="6.5" ry="2.2" />
    <path d="M25 33h14M25 39h14M25 45h14" />
  </svg>
)

export const VisionIcon = () => (
  <svg {...base}>
    <path d="M11 30c0-7 8-11.5 21-11.5S53 23 53 30v4c0 7-8 11.5-21 11.5S11 41 11 34z" />
    <rect x="19" y="27" width="10.5" height="10" rx="4" />
    <rect x="34.5" y="27" width="10.5" height="10" rx="4" />
    <path d="M32 27.5v6" />
    <path d="M11 31l-5-3M53 31l5-3" />
  </svg>
)

export const AccessoryIcon = () => (
  <svg {...base}>
    <circle cx="32" cy="36" r="13" />
    <circle cx="32" cy="36" r="4.5" />
    <path d="M27 23.5c0-5.5 2.2-9.5 5-9.5s5 4 5 9.5" />
  </svg>
)

export const GridIcon = () => (
  <svg {...base}>
    <rect x="10" y="10" width="19" height="19" rx="2.5" />
    <rect x="35" y="10" width="19" height="19" rx="2.5" />
    <rect x="10" y="35" width="19" height="19" rx="2.5" />
    <rect x="35" y="35" width="19" height="19" rx="2.5" />
  </svg>
)

export const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

// Map category id to icon component
export const getCategoryIcon = (category) => {
  const map = {
    mac: MacIcon,
    iphone: IPhoneIcon,
    ipad: IPadIcon,
    ipod: IPodIcon,
    watch: WatchIcon,
    airpods: AirPodsIcon,
    appletv: TVIcon,
    homepod: HomePodIcon,
    vision: VisionIcon,
    accessories: AccessoryIcon,
    all: GridIcon,
  }
  return map[category] || AccessoryIcon
}

// Individual product icon based on name keyword matching
export const getProductIcon = (product) => {
  return getCategoryIcon(product.category)
}
