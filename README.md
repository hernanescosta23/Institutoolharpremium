# Instituto Olhar Premium — Site

Repositório do site estático + PHP backend leve.

Arquivos principais para subir:
- `index.html`
- `cookies.html`, `privacy.html`, `terms.html`
- Pasta `assets/` (css, js, img, vendor)
- Pasta `api/` (PHP endpoints)
- Pasta `forms/` (form handlers)
- `data/news.json`

OBS: não versione `database/config.php` com credenciais. Use `database/config.example.php`.

Como publicar no GitHub (resumo):

1. Inicializar repo local (já posso fazer isso):

```bash
cd "c:\Users\dhsoc\Documents\sitefinal"
git init
git add .gitignore README.md
git commit -m "chore: add gitignore and README"
```

2. Criar repo no GitHub (manual):
- Vá em https://github.com -> New repository -> crie um repo vazio.

3. Conectar remoto e enviar:

```bash
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git branch -M main
git add .
git commit -m "chore: initial site upload"
git push -u origin main
```

Se quiser, eu:
- inicializo o git e faço o commit local aqui;
- ou apenas preparo tudo e te passo os comandos.

Diga qual prefere.