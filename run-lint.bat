@echo off
cd D:\college\IIC\final-out\IIC-official-website-
timeout /t 60 .\node_modules\.bin\oxlint 2>&1
if %errorlevel% neq 0 (
    echo Lint completed with errors
) else (
    echo Lint passed
)
timeout /t 2