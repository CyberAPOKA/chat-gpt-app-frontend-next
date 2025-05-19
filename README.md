## Getting Started

First, run the development server:

npm install

```bash

npm install
#
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev

# utils

# Copia todos os temas do primereact da nodule modules para a public/themes
cp -r node_modules/primereact/resources/themes/* public/themes/

# Exibe todos os temas
Get-ChildItem -Path .\public\themes\ -Directory | Select-Object -ExpandProperty Name

```
