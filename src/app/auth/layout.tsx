import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autenticação',
  description: 'Faça login ou crie sua conta na JC Pastelaria Gourmet'
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}