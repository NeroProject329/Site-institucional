import "./globals.css";
import { WhatsAppProvider } from "@/components/providers/WhatsAppProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body suppressHydrationWarning>
        <WhatsAppProvider>{children}</WhatsAppProvider>
      </body>
    </html>
  );
}
