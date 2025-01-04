'use client'

import { SessionProvider } from "next-auth/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";


export const Provider = ({children} : {children : React.ReactNode}) => {
    const client = new QueryClient()
    return <SessionProvider>
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    </SessionProvider>

}