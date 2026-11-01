import { getLocaleOnServer } from '@/i18n/server'
import type { Metadata } from 'next'

import './styles/globals.css'
import './styles/markdown.scss'
import './styles/etymology.css'

const LocaleLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = getLocaleOnServer()
  return (
    <html lang={locale ?? 'en'} className="h-full">
      <body className="h-full">
        <div className="overflow-x-auto">
          <div className="w-screen h-screen min-w-[300px]">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout

export const metadata: Metadata = {
  title: 'Etymology',
  description: 'An English etymology lookup tool (Prefix, Root, Suffix, Historical Path, Related Words). Learn English engagingly and retain words permanently by understanding the reasons.',
  keywords: [
    'English',
    'Learning',
    'Etymology',
    'Prefix',
    'Root',
    'Suffix',
    'Historical Path',
    'Related Words',
    'Vocabulary',
  ],
}