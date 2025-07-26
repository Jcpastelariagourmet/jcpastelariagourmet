'use client';

import React, { useState, useEffect } from 'react';
import { supabase, db, isSupabaseConfigured } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Container } from '@/components/layout/Container';
import { CheckCircle, XCircle, AlertCircle, Database, Wifi, WifiOff } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  details?: any;
}

export default function TestSupabasePage() {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');

  const addResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const runTests = async () => {
    setIsRunning(true);
    setTestResults([]);
    setConnectionStatus('unknown');

    // Test 1: Configuration Check
    addResult({
      name: 'Configuração do Supabase',
      status: isSupabaseConfigured ? 'success' : 'error',
      message: isSupabaseConfigured 
        ? 'Variáveis de ambiente configuradas corretamente' 
        : 'Variáveis de ambiente não configuradas',
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não configurada',
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        isConfigured: isSupabaseConfigured
      }
    });

    if (!isSupabaseConfigured || !supabase || !db) {
      addResult({
        name: 'Conexão com Supabase',
        status: 'error',
        message: 'Não é possível conectar - configuração inválida'
      });
      setConnectionStatus('disconnected');
      setIsRunning(false);
      return;
    }

    try {
      // Test 2: Basic Connection
      const { data: healthCheck, error: healthError } = await supabase
        .from('categories')
        .select('count')
        .limit(1);

      if (healthError) {
        addResult({
          name: 'Conexão Básica',
          status: 'error',
          message: `Erro de conexão: ${healthError.message}`,
          details: healthError
        });
        setConnectionStatus('disconnected');
      } else {
        addResult({
          name: 'Conexão Básica',
          status: 'success',
          message: 'Conexão estabelecida com sucesso'
        });
        setConnectionStatus('connected');
      }

      // Test 3: Categories Table
      const { data: categories, error: categoriesError } = await db.categories()
        .select('*')
        .limit(10);

      addResult({
        name: 'Tabela Categories',
        status: categoriesError ? 'error' : 'success',
        message: categoriesError 
          ? `Erro ao acessar categorias: ${categoriesError.message}`
          : `${categories?.length || 0} categorias encontradas`,
        details: categoriesError || categories
      });

      // Test 4: Products Table
      const { data: products, error: productsError } = await db.products()
        .select(`
          *,
          category:categories(name)
        `)
        .limit(10);

      addResult({
        name: 'Tabela Products',
        status: productsError ? 'error' : 'success',
        message: productsError 
          ? `Erro ao acessar produtos: ${productsError.message}`
          : `${products?.length || 0} produtos encontrados`,
        details: productsError || products
      });

      // Test 5: Complex Query (Products with Categories)
      const { data: productsWithCategories, error: complexError } = await db.products()
        .select(`
          id,
          name,
          price,
          category:categories(
            id,
            name
          )
        `)
        .eq('is_available', true)
        .limit(5);

      addResult({
        name: 'Consulta Complexa (JOIN)',
        status: complexError ? 'error' : 'success',
        message: complexError 
          ? `Erro na consulta complexa: ${complexError.message}`
          : `Consulta JOIN executada com sucesso (${productsWithCategories?.length || 0} resultados)`,
        details: complexError || productsWithCategories
      });

      // Test 6: RLS Policies
      const { data: rlsTest, error: rlsError } = await supabase
        .from('users')
        .select('count')
        .limit(1);

      addResult({
        name: 'Row Level Security (RLS)',
        status: rlsError ? 'warning' : 'success',
        message: rlsError 
          ? `RLS ativo (esperado): ${rlsError.message}`
          : 'RLS configurado corretamente',
        details: rlsError
      });

      // Test 7: System Settings
      const { data: settings, error: settingsError } = await db.systemSettings()
        .select('*')
        .limit(5);

      addResult({
        name: 'Configurações do Sistema',
        status: settingsError ? 'error' : 'success',
        message: settingsError 
          ? `Erro ao acessar configurações: ${settingsError.message}`
          : `${settings?.length || 0} configurações encontradas`,
        details: settingsError || settings
      });

    } catch (error) {
      addResult({
        name: 'Erro Geral',
        status: 'error',
        message: `Erro inesperado: ${error}`,
        details: error
      });
      setConnectionStatus('disconnected');
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    switch (status) {
      case 'success':
        return <Badge variant="success">Sucesso</Badge>;
      case 'error':
        return <Badge variant="error">Erro</Badge>;
      case 'warning':
        return <Badge variant="warning">Aviso</Badge>;
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-6 h-6 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="w-6 h-6 text-red-500" />;
      default:
        return <Database className="w-6 h-6 text-gray-500" />;
    }
  };

  const getConnectionStatus = () => {
    switch (connectionStatus) {
      case 'connected':
        return { text: 'Conectado', color: 'text-green-600' };
      case 'disconnected':
        return { text: 'Desconectado', color: 'text-red-600' };
      default:
        return { text: 'Desconhecido', color: 'text-gray-600' };
    }
  };

  useEffect(() => {
    // Run tests automatically on mount
    runTests();
  }, []);

  const successCount = testResults.filter(r => r.status === 'success').length;
  const errorCount = testResults.filter(r => r.status === 'error').length;
  const warningCount = testResults.filter(r => r.status === 'warning').length;

  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Teste de Conexão Supabase
          </h1>
          <p className="text-gray-600">
            Verificação da configuração e conectividade com o banco de dados
          </p>
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              {getConnectionIcon()}
              Status da Conexão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-lg font-semibold ${getConnectionStatus().color}`}>
                  {getConnectionStatus().text}
                </div>
                <div className="text-sm text-gray-600">
                  {isSupabaseConfigured 
                    ? `URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`
                    : 'Configuração não encontrada'
                  }
                </div>
              </div>
              <Button 
                onClick={runTests} 
                disabled={isRunning}
                variant="outline"
              >
                {isRunning ? 'Testando...' : 'Executar Testes'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Test Summary */}
        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Resumo dos Testes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{successCount}</div>
                  <div className="text-sm text-gray-600">Sucessos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                  <div className="text-sm text-gray-600">Erros</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{warningCount}</div>
                  <div className="text-sm text-gray-600">Avisos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Test Results */}
        <div className="space-y-4">
          {testResults.map((result, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{result.name}</h3>
                      {getStatusBadge(result.status)}
                    </div>
                    <p className="text-gray-600 mb-3">{result.message}</p>
                    {result.details && (
                      <details className="text-sm">
                        <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                          Ver detalhes
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-50 rounded text-xs overflow-auto">
                          {JSON.stringify(result.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Instructions */}
        {!isSupabaseConfigured && (
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Configuração Necessária</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Para conectar com o Supabase, você precisa configurar as variáveis de ambiente:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <pre className="text-sm">
{`# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://[seu-projeto].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ[sua-chave-publica]
SUPABASE_SERVICE_ROLE_KEY=eyJ[sua-chave-privada]`}
                  </pre>
                </div>
                <p className="text-sm text-gray-600">
                  Consulte o arquivo <code>setup-supabase.md</code> para instruções completas.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        {connectionStatus === 'connected' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">✅ Conexão Estabelecida!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-600">
                  Sua conexão com o Supabase está funcionando. Próximos passos:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Teste o catálogo de produtos: <a href="/test-catalog" className="text-blue-600 hover:underline">/test-catalog</a></li>
                  <li>Verifique os dados no dashboard do Supabase</li>
                  <li>Configure o deploy na Vercel com as mesmas variáveis</li>
                  <li>Teste a aplicação em produção</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Container>
  );
}