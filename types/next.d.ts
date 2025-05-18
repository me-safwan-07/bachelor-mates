// src/types/next.d.ts
import 'next'
import { ReactNode } from 'react'

declare module 'next' {
  export interface LayoutProps {
    children: ReactNode
    params: Record<string, string | string[]>
  }

  export interface PageProps {
    params?: Record<string, string | string[]>
    searchParams?: Record<string, string | string[]>
  }

  export interface RouteHandlerContext {
    params: Record<string, string | string[]>
    searchParams?: URLSearchParams
  }

  // For API routes
  export interface NextApiHandler<T = any> {
    (
      req: NextApiRequest,
      res: NextApiResponse<T>,
      context?: RouteHandlerContext
    ): void | Promise<void>
  }
}