@echo off
echo ========================================
echo   PUSH PARA GITHUB - JC PASTELARIA
echo ========================================
echo.

echo IMPORTANTE: Primeiro crie o repositorio no GitHub:
echo 1. Acesse: https://github.com/new
echo 2. Nome: jcpastelariagourmet
echo 3. NAO inicialize com README
echo 4. Clique "Create repository"
echo.

pause

echo Fazendo push para o GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   PUSH REALIZADO COM SUCESSO!
    echo ========================================
    echo.
    echo Seu repositorio esta disponivel em:
    echo https://github.com/Jcpastelariagourmet/jcpastelariagourmet
    echo.
    echo Agora voce pode:
    echo 1. Fazer deploy no Vercel
    echo 2. Colaborar com outros desenvolvedores
    echo 3. Ter backup automatico do codigo
    echo.
) else (
    echo.
    echo ========================================
    echo   ERRO NO PUSH
    echo ========================================
    echo.
    echo Verifique se:
    echo 1. O repositorio foi criado no GitHub
    echo 2. Voce tem permissao de acesso
    echo 3. A URL esta correta
    echo.
)

pause