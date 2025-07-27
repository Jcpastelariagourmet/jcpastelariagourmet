@echo off
echo ========================================
echo   JC Pastelaria Gourmet - Vercel Deploy
echo ========================================
echo.

echo Verificando se o Vercel CLI esta instalado...
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI nao encontrado. Instalando...
    npm install -g vercel
    echo.
)

echo Fazendo login no Vercel...
vercel login

echo.
echo Iniciando deploy...
vercel

echo.
echo ========================================
echo   Deploy concluido!
echo ========================================
echo.
echo Para fazer deploy em producao, execute:
echo vercel --prod
echo.
pause