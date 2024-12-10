import RQProvider from '@/components/RQProvider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RQProvider>{children}</RQProvider>
      </body>
    </html>
  );
}
