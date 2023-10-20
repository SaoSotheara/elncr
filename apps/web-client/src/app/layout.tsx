import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Elncr',
  description:
    'Unleash Your Career Potential: Job Hunting Made Effortlessly Easy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
