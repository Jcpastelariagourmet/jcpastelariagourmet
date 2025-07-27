@echo off
echo ========================================
echo   PUSH PARA GITHUB - PRONTO!
echo ========================================
echo.

echo Fazendo push do projeto completo...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   🎉 SUCESSO! PROJETO NO GITHUB!
    echo ========================================
    echo.
    echo ✅ Sistema de carrinho enviado
    echo ✅ Complementos implementados
    echo ✅ Configurações do Vercel incluídas
    echo ✅ Scripts de deploy prontos
    echo.
    echo 🌐 Repositório disponível em:
    echo https://github.com/Jcpastelariagourmet/jcpastelariagourmet
    echo.
    echo 🚀 Próximos passos:
    echo 1. Fazer deploy no Vercel
    echo 2. Conectar Vercel com GitHub para deploy automático
    echo.
) else (
    echo.
    echo ❌ Erro no push. Verifique se:
    echo 1. O repositório foi criado
    echo 2. Você tem permissão de acesso
    echo 3. A URL está correta
    echo.
)

pause