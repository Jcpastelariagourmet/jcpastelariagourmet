export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-brown-500 mb-4">
          JC Pastelaria Gourmet
        </h1>
        <p className="text-lg text-brown-400 mb-8">
          Sistema em desenvolvimento
        </p>
        <div className="space-y-4">
          <div className="bg-card-400 p-4 rounded-lg shadow-card">
            <h2 className="text-xl font-semibold text-brown-500 mb-2">
              ✅ Autenticação Configurada
            </h2>
            <p className="text-brown-400">
              Sistema de autenticação Supabase implementado
            </p>
          </div>
          <div className="bg-card-400 p-4 rounded-lg shadow-card">
            <h2 className="text-xl font-semibold text-brown-500 mb-2">
              🔧 Próximos Passos
            </h2>
            <p className="text-brown-400">
              Configure as variáveis de ambiente do Supabase no .env.local
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}