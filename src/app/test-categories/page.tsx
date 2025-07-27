'use client';

import React from 'react';
import { CategoryGrid, CategoryNavigation, CategoryShowcase } from '@/components/categories';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { MainLayout } from '@/components/layout/MainLayout';
import { Container } from '@/components/layout/Container';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function TestCategoriesPage() {
  const { categories, loading } = useProducts();

  // Featured categories (first 2 categories for demo)
  const featuredCategoryIds = categories.slice(0, 2).map(cat => cat.id);

  const breadcrumbItems = [
    { label: 'Teste', href: '/test-categories' },
    { label: 'Sistema de Categorias', current: true }
  ];

  if (loading) {
    return (
      <MainLayout>
        <Container className="py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-6 bg-gray-200 rounded w-64" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-48" />
              ))}
            </div>
          </div>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <Container className="py-8">
          <div className="space-y-12">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Page Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                Sistema de Categorias - Teste
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Demonstração completa do sistema de categorias implementado
              </p>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/">
                <Button variant="primary">
                  Ver Cardápio Principal (Home)
                </Button>
              </Link>
              <Link href="/?categoria=1">
                <Button variant="outline">
                  Ver Categoria Específica
                </Button>
              </Link>
              <Link href="/?categoria=2">
                <Button variant="outline">
                  Ver Outra Categoria
                </Button>
              </Link>
            </div>

            {/* Category Navigation Component */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                1. Navegação por Categorias
              </h2>
              <p className="text-gray-600">
                Componente de navegação horizontal com contadores de produtos
              </p>
              <CategoryNavigation
                categories={categories}
                showAll={true}
                layout="horizontal"
                showProductCounts={true}
              />
            </div>

            {/* Category Showcase Component */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                2. Showcase de Categorias (Para Home Page)
              </h2>
              <p className="text-gray-600">
                Componente para exibir categorias em destaque na página inicial
              </p>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <CategoryShowcase
                  categories={categories}
                  featuredCategoryIds={featuredCategoryIds}
                  maxItems={4}
                  title="Categorias em Destaque"
                  subtitle="Explore nossa variedade de produtos"
                  showViewAll={true}
                />
              </div>
            </div>

            {/* Category Grid Component */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                3. Grid de Categorias
              </h2>
              <p className="text-gray-600">
                Grid completo com categorias em destaque e regulares
              </p>
              <CategoryGrid
                categories={categories}
                featuredCategoryIds={featuredCategoryIds}
                columns={4}
                showProductCounts={true}
              />
            </div>

            {/* Vertical Navigation */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                4. Navegação Vertical
              </h2>
              <p className="text-gray-600">
                Navegação em layout vertical para sidebars
              </p>
              <div className="max-w-sm">
                <CategoryNavigation
                  categories={categories}
                  showAll={true}
                  layout="vertical"
                  showProductCounts={true}
                />
              </div>
            </div>

            {/* Implementation Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                ✅ Funcionalidades Implementadas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Navegação por Categorias</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Navegação horizontal e vertical</li>
                    <li>• Ícones personalizados por categoria</li>
                    <li>• Contadores de produtos</li>
                    <li>• Estado ativo/selecionado</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Cardápio Principal</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Cardápio completo na página inicial (/)</li>
                    <li>• Filtros por categoria (?categoria=id)</li>
                    <li>• Navegação sticky por categorias</li>
                    <li>• Hero section com informações do restaurante</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Breadcrumb</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Navegação hierárquica</li>
                    <li>• Ícones personalizados</li>
                    <li>• Links funcionais</li>
                    <li>• Estado atual destacado</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Sistema de Destaque</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Categorias em destaque</li>
                    <li>• Cores personalizadas</li>
                    <li>• Badges de destaque</li>
                    <li>• Layouts responsivos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}