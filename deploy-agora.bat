@echo off
echo ========================================
echo   DEPLOY RAPIDO NO VERCEL
echo ========================================
echo.

echo 1. Acesse: https://vercel.com
echo 2. Faca login
echo 3. Clique "Add New Project"
echo 4. Clique "Browse" e selecione esta pasta
echo 5. Clique "Upload"
echo 6. Aguarde o deploy
echo.

echo OU execute os comandos abaixo:
echo.

echo Instalando Vercel CLI...
npm install -g vercel

echo.
echo Fazendo login...
vercel login

echo.
echo Fazendo deploy...
vercel

echo.
echo ========================================
echo   DEPLOY CONCLUIDO!
echo ========================================
echo.
pause