# 🔧 Server/Client Component Fix

## Issue Resolved
Fixed "Class extends value undefined is not a constructor or null" error caused by server-side rendering of Three.js components.

## Root Cause
The `Loader` component (which uses `@react-three/drei`) was being exported from `src/components/ui/index.ts` and imported in the server-side layout component.

## Solution Applied

### 1. Removed Server-Side Import
- ❌ Removed `Loader` export from `src/components/ui/index.ts`
- ✅ Kept direct import in `src/components/sections/hero.tsx` (client component)

### 2. Added Client Directive
- ✅ Added `"use client"` to `src/components/ui/Loader.tsx`

### 3. Verified Other Components
- ✅ `StarsCanvas` already had `"use client"` directive
- ✅ `Astronaut` already had `"use client"` directive
- ✅ All Three.js components properly isolated to client-side

## Results
- ✅ **Build**: Successful compilation
- ✅ **Dev Server**: Running without errors  
- ✅ **Performance**: Maintained 397 kB bundle size
- ✅ **Functionality**: All 3D components working properly

## Key Takeaway
When using Three.js or other browser-only libraries in Next.js 14 App Router:
1. Always mark components with `"use client"`
2. Don't export them from index files used in server components
3. Import them directly in client components only
