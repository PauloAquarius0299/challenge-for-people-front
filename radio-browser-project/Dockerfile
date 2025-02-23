# Estágio 1: Build da aplicação
FROM node:18 AS build

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json* ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Constrói o projeto
RUN npm run build

# Estágio 2: Serve a aplicação
FROM nginx:alpine

# Copia os arquivos construídos para o servidor Nginx
COPY --from=build /app/.next/static /usr/share/nginx/html/_next/static
COPY --from=build /app/public /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]