import './globals.css';

export const metadata = {
  title: 'Marina Nails - Cartão Fidelidade',
  description: 'Sistema de cartão fidelidade para Marina Nails',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
