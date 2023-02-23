import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { api } from "utils/api"

import "styles/globals.css"
import { NotesProvider, ToastProvider } from "utils/providers"

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <SessionProvider session={session}>
      <NotesProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </NotesProvider>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
