# Generar Ventas
Write-Host "Generando Prisma Client para Ventas..."
Set-Location C:\Users\Lentejuelas\00-sgi-project\apps\ventas
pnpm exec prisma generate

# Generar Core
Write-Host "Generando Prisma Client para Core..."
Set-Location C:\Users\Lentejuelas\00-sgi-project\apps\core
pnpm exec prisma generate

Write-Host "Listo. Ambos clientes generados."