#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Script para atualizar automaticamente o arquivo index.json dos changelogs
 * 
 * Uso:
 * node scripts/update-changelog-index.js
 * 
 * Este script:
 * 1. Escaneia a pasta public/changelogs/ para arquivos .txt
 * 2. Gera automaticamente o arquivo index.json
 * 3. Ordena as versões da mais recente para a mais antiga
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANGELOGS_DIR = path.join(__dirname, '../public/changelogs');
const INDEX_FILE = path.join(CHANGELOGS_DIR, 'index.json');

function extractVersionFromFilename(filename) {
  // Remove a extensão .txt
  const nameWithoutExt = filename.replace('.txt', '');

  // Se começa com 'v', mantém como está
  if (nameWithoutExt.startsWith('v')) {
    return nameWithoutExt;
  }

  // Se é um número de versão (ex: 3.1.3.9), mantém como está
  if (/^\d+\.\d+\.\d+(\.\d+)?$/.test(nameWithoutExt)) {
    return nameWithoutExt;
  }

  // Para outros formatos, tenta extrair números
  const versionMatch = nameWithoutExt.match(/(\d+(?:\.\d+)*)/);
  if (versionMatch) {
    return versionMatch[1];
  }

  return nameWithoutExt;
}

function parseVersion(versionString) {
  // Remove 'v' prefix se existir
  const cleanVersion = versionString.replace(/^v/, '');

  // Divide em partes numéricas
  const parts = cleanVersion.split('.').map(part => parseInt(part, 10) || 0);

  // Pad com zeros se necessário (ex: 3.1 -> 3.1.0.0)
  while (parts.length < 4) {
    parts.push(0);
  }

  return parts;
}

function compareVersions(a, b) {
  const versionA = parseVersion(a.version);
  const versionB = parseVersion(b.version);

  // Compara da maior para a menor (mais recente primeiro)
  for (let i = 0; i < 4; i++) {
    if (versionA[i] !== versionB[i]) {
      return versionB[i] - versionA[i];
    }
  }

  return 0;
}

function updateChangelogIndex() {
  try {
    // Verifica se a pasta existe
    if (!fs.existsSync(CHANGELOGS_DIR)) {
      console.error(`❌ Pasta ${CHANGELOGS_DIR} não encontrada!`);
      process.exit(1);
    }

    // Lista todos os arquivos .txt na pasta
    const files = fs.readdirSync(CHANGELOGS_DIR)
      .filter(file => file.endsWith('.txt'))
      .filter(file => file !== 'index.json'); // Exclui o próprio index.json

    if (files.length === 0) {
      console.log('⚠️  Nenhum arquivo de changelog encontrado!');
      return;
    }

    console.log(`📋 Encontrados ${files.length} arquivos de changelog:`);

    // Processa cada arquivo
    const versions = files.map((file, index) => {
      const version = extractVersionFromFilename(file);
      console.log(`   ${index + 1}. ${file} -> ${version}`);

      return {
        file,
        version,
        order: index + 1
      };
    });

    // Ordena por versão (mais recente primeiro)
    versions.sort(compareVersions);

    // Atualiza a ordem
    versions.forEach((version, index) => {
      version.order = index + 1;
    });

    // Cria o objeto do índice
    const indexData = {
      versions,
      lastUpdated: new Date().toISOString(),
      totalVersions: versions.length
    };

    // Escreve o arquivo
    fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2));

    console.log(`✅ Arquivo index.json atualizado com sucesso!`);
    console.log(`📊 Total de versões: ${versions.length}`);
    console.log(`🕒 Última atualização: ${indexData.lastUpdated}`);

  } catch (error) {
    console.error('❌ Erro ao atualizar índice de changelogs:', error.message);
    process.exit(1);
  }
}

// Executa o script
updateChangelogIndex();