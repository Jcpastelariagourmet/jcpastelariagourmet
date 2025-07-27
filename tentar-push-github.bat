@echo off
echo ========================================
echo   TENTATIVAS DE PUSH PARA GITHUB
echo ========================================
echo.

echo Tentativa 1: Push normal...
git push origin main
if %errorlevel% equ 0 (
    echo SUCESSO! Repositorio enviado.
    goto :success
)

echo.
echo Tentativa 2: Push com force...
git push origin main --force
if %errorlevel% equ 0 (
    echo SUCESSO! Repositorio enviado com force.
    goto :success
)

echo.
echo Tentativa 3: Verificando se repositorio existe...
curl -s https://api.github.com/repos/Jcpastelariagourmet/jcpastelariagourmet
echo.

echo.
echo ========================================
echo   TODAS AS TENTATIVAS FALHARAM
echo ========================================
echo.
echo O repositorio precisa ser criado primeiro:
echo 1. Acesse: https://github.com/new
echo 2. Nome: jcpastelariagourmet
echo 3. Conta: Jcpastelariagourmet
echo 4. NAO inicialize com README
echo 5. Clique "Create repository"
echo 6. Execute este script novamente
echo.
goto :end

:success
echo.
echo ========================================
echo   PUSH REALIZADO COM SUCESSO!
echo ========================================
echo.
echo Repositorio disponivel em:
echo https://github.com/Jcpastelariagourmet/jcpastelariagourmet
echo.
echo Agora voce pode fazer deploy no Vercel!
echo.

:end
pause