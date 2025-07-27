@echo off
echo ========================================
echo   JC Pastelaria Gourmet - GitHub Push
echo ========================================
echo.

echo 1. Primeiro, crie um repositorio no GitHub:
echo    - Acesse: https://github.com/new
echo    - Nome: jc-pastelaria-gourmet
echo    - Nao inicialize com README
echo.

echo 2. Depois de criar, execute os comandos abaixo:
echo.

set /p repo_url="Digite a URL do seu repositorio (ex: https://github.com/usuario/jc-pastelaria-gourmet.git): "

echo.
echo Configurando remote...
git remote remove origin 2>nul
git remote add origin %repo_url%

echo.
echo Fazendo push...
git push -u origin main

echo.
echo ========================================
echo   Push concluido com sucesso!
echo ========================================
echo.
echo Acesse seu repositorio para verificar:
echo %repo_url%
echo.
pause