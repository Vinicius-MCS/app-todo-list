import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, '../dist');
const deployDir = path.join(__dirname, '../gh-pages-deploy');

try {
  // Remove diretório de deploy anterior se existir
  if (fs.existsSync(deployDir)) {
    fs.rmSync(deployDir, { recursive: true, force: true });
  }

  // Cria diretório temporário
  fs.mkdirSync(deployDir, { recursive: true });

  // Clone ou inicializa repositório Git na pasta temporária
  console.log('Preparando repositório para deploy...');
  
  try {
    execSync(`git clone --branch gh-pages https://github.com/Vinicius-MCS/app-todo-list.git ${deployDir}`, 
      { stdio: 'inherit' });
  } catch (e) {
    // Se a branch não existe, gera com --orphan
    execSync(`git clone https://github.com/Vinicius-MCS/app-todo-list.git ${deployDir}`, 
      { stdio: 'inherit' });
    process.chdir(deployDir);
    try {
      execSync('git checkout gh-pages');
    } catch (e) {
      console.log('Criando branch gh-pages...');
      execSync('git checkout --orphan gh-pages');
      execSync('git rm -rf .');
    }
    process.chdir(__dirname + '/..');
  }

  // Remove arquivos antigos
  console.log('Limpando deploy anterior...');
  const files = fs.readdirSync(deployDir);
  files.forEach(file => {
    if (file !== '.git' && file !== '.gitignore') {
      const filePath = path.join(deployDir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(filePath);
      }
    }
  });

  // Copia arquivos de dist
  console.log('Copiando arquivos do dist...');
  const copyDir = (src, dest) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      if (fs.lstatSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  };
  copyDir(distDir, deployDir);

  // Commit e push
  console.log('Fazendo commit e push...');
  process.chdir(deployDir);
  execSync('git add -A');
  execSync('git config user.name "GitHub Actions" || true');
  execSync('git config user.email "actions@github.com" || true');
  execSync(`git commit -m "Deploy: $(date)" --allow-empty`, { stdio: 'inherit' });
  execSync('git push -u origin gh-pages', { stdio: 'inherit' });

  // Cleanup
  process.chdir(__dirname + '/..');
  fs.rmSync(deployDir, { recursive: true, force: true });
  
  console.log('✓ Deploy concluído com sucesso!');
} catch (error) {
  console.error('✗ Erro durante deploy:', error.message);
  process.exit(1);
}
