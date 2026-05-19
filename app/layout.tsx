import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DishDash - Recipe Generator',
  description: 'Generate recipes from ingredients using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-cream">{children}</body>
    </html>
  );
}
