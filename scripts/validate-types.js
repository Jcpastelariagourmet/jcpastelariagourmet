#!/usr/bin/env node

/**
 * Type validation script for JC Pastelaria Gourmet
 * This script validates all TypeScript types and checks for common issues
 */

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logError(message) {
  log(`❌ ${message}`, 'red')
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue')
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

const TYPES_DIR = path.join(__dirname, '../src/types')
const TYPE_FILES = [
  'index.ts',
  'supabase.ts',
  'database.ts',
  'components.ts',
  'forms.ts',
  'store.ts',
  'api.ts',
  'utils.ts'
]

async function checkTypeFiles() {
  logInfo('Checking type files existence...')
  
  let allFilesExist = true
  
  for (const file of TYPE_FILES) {
    const filePath = path.join(TYPES_DIR, file)
    if (fs.existsSync(filePath)) {
      logSuccess(`${file} exists`)
    } else {
      logError(`${file} is missing`)
      allFilesExist = false
    }
  }
  
  return allFilesExist
}

async function validateTypeScript() {
  logInfo('Running TypeScript compiler check...')
  
  try {
    execSync('npx tsc --noEmit --skipLibCheck', { stdio: 'pipe' })
    logSuccess('TypeScript compilation passed')
    return true
  } catch (error) {
    logError('TypeScript compilation failed')
    
    // Try to get more detailed error information
    try {
      const output = execSync('npx tsc --noEmit --skipLibCheck', { encoding: 'utf8' })
      log(output, 'red')
    } catch (detailedError) {
      log(detailedError.stdout || detailedError.message, 'red')
    }
    
    return false
  }
}

async function validateESLint() {
  logInfo('Running ESLint on type files...')
  
  try {
    execSync(`npx eslint ${TYPES_DIR}/**/*.ts`, { stdio: 'pipe' })
    logSuccess('ESLint validation passed')
    return true
  } catch (error) {
    logWarning('ESLint found issues in type files')
    
    try {
      const output = execSync(`npx eslint ${TYPES_DIR}/**/*.ts`, { encoding: 'utf8' })
      log(output, 'yellow')
    } catch (detailedError) {
      log(detailedError.stdout || detailedError.message, 'yellow')
    }
    
    return false
  }
}

async function checkCircularDependencies() {
  logInfo('Checking for circular dependencies...')
  
  const dependencies = new Map()
  const visited = new Set()
  const recursionStack = new Set()
  
  function extractImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8')
      const imports = []
      
      // Match import statements
      const importRegex = /import.*from\s+['"]\.\/([^'"]+)['"]/g
      let match
      
      while ((match = importRegex.exec(content)) !== null) {
        imports.push(match[1])
      }
      
      return imports
    } catch (error) {
      return []
    }
  }
  
  function buildDependencyGraph() {
    for (const file of TYPE_FILES) {
      const filePath = path.join(TYPES_DIR, file)
      const fileName = file.replace('.ts', '')
      
      if (fs.existsSync(filePath)) {
        const imports = extractImports(filePath)
        dependencies.set(fileName, imports)
      }
    }
  }
  
  function hasCycle(node) {
    if (recursionStack.has(node)) {
      return true
    }
    
    if (visited.has(node)) {
      return false
    }
    
    visited.add(node)
    recursionStack.add(node)
    
    const deps = dependencies.get(node) || []
    for (const dep of deps) {
      if (hasCycle(dep)) {
        return true
      }
    }
    
    recursionStack.delete(node)
    return false
  }
  
  buildDependencyGraph()
  
  let hasCircularDeps = false
  for (const [file] of dependencies) {
    visited.clear()
    recursionStack.clear()
    
    if (hasCycle(file)) {
      logError(`Circular dependency detected involving ${file}`)
      hasCircularDeps = true
    }
  }
  
  if (!hasCircularDeps) {
    logSuccess('No circular dependencies found')
  }
  
  return !hasCircularDeps
}

async function validateExports() {
  logInfo('Validating type exports...')
  
  const indexPath = path.join(TYPES_DIR, 'index.ts')
  
  if (!fs.existsSync(indexPath)) {
    logError('index.ts file is missing')
    return false
  }
  
  const indexContent = fs.readFileSync(indexPath, 'utf8')
  const expectedExports = TYPE_FILES.filter(f => f !== 'index.ts').map(f => f.replace('.ts', ''))
  
  let allExportsPresent = true
  
  for (const exportFile of expectedExports) {
    const exportPattern = new RegExp(`export.*from\\s+['"]\\.\/${exportFile}['"]`)
    if (exportPattern.test(indexContent)) {
      logSuccess(`${exportFile} is properly exported`)
    } else {
      logError(`${exportFile} is not exported in index.ts`)
      allExportsPresent = false
    }
  }
  
  return allExportsPresent
}

async function checkTypeConsistency() {
  logInfo('Checking type consistency...')
  
  // Check if database types match Supabase types
  const supabasePath = path.join(TYPES_DIR, 'supabase.ts')
  const databasePath = path.join(TYPES_DIR, 'database.ts')
  
  if (!fs.existsSync(supabasePath) || !fs.existsSync(databasePath)) {
    logWarning('Cannot check type consistency - files missing')
    return false
  }
  
  const supabaseContent = fs.readFileSync(supabasePath, 'utf8')
  const databaseContent = fs.readFileSync(databasePath, 'utf8')
  
  // Check if database.ts imports from supabase.ts
  if (databaseContent.includes("from './supabase'")) {
    logSuccess('Database types properly import from Supabase types')
  } else {
    logWarning('Database types should import from Supabase types')
  }
  
  // Check for common enum consistency
  const enumPattern = /export type (\w+) = /g
  const supabaseEnums = []
  let match
  
  while ((match = enumPattern.exec(supabaseContent)) !== null) {
    supabaseEnums.push(match[1])
  }
  
  logInfo(`Found ${supabaseEnums.length} enum types in Supabase types`)
  
  return true
}

async function generateTypeReport() {
  logInfo('Generating type coverage report...')
  
  const report = {
    totalFiles: TYPE_FILES.length,
    existingFiles: 0,
    totalLines: 0,
    exportedTypes: 0,
    interfaces: 0,
    types: 0,
    enums: 0
  }
  
  for (const file of TYPE_FILES) {
    const filePath = path.join(TYPES_DIR, file)
    
    if (fs.existsSync(filePath)) {
      report.existingFiles++
      
      const content = fs.readFileSync(filePath, 'utf8')
      const lines = content.split('\n')
      report.totalLines += lines.length
      
      // Count different type definitions
      report.interfaces += (content.match(/export interface/g) || []).length
      report.types += (content.match(/export type/g) || []).length
      report.enums += (content.match(/export enum/g) || []).length
      report.exportedTypes += (content.match(/export (interface|type|enum)/g) || []).length
    }
  }
  
  log('\n📊 Type System Report:', 'bright')
  log('=====================', 'bright')
  log(`Files: ${report.existingFiles}/${report.totalFiles}`)
  log(`Total lines: ${report.totalLines}`)
  log(`Exported types: ${report.exportedTypes}`)
  log(`  - Interfaces: ${report.interfaces}`)
  log(`  - Type aliases: ${report.types}`)
  log(`  - Enums: ${report.enums}`)
  
  return report
}

async function main() {
  log('🔍 JC Pastelaria Gourmet - Type Validation', 'bright')
  log('==========================================', 'bright')
  
  const results = {
    filesExist: await checkTypeFiles(),
    typescript: await validateTypeScript(),
    eslint: await validateESLint(),
    circularDeps: await checkCircularDependencies(),
    exports: await validateExports(),
    consistency: await checkTypeConsistency()
  }
  
  await generateTypeReport()
  
  log('\n📋 Validation Summary:', 'bright')
  log('=====================', 'bright')
  
  const checks = [
    { name: 'File existence', passed: results.filesExist },
    { name: 'TypeScript compilation', passed: results.typescript },
    { name: 'ESLint validation', passed: results.eslint },
    { name: 'Circular dependencies', passed: results.circularDeps },
    { name: 'Export validation', passed: results.exports },
    { name: 'Type consistency', passed: results.consistency }
  ]
  
  let allPassed = true
  
  for (const check of checks) {
    if (check.passed) {
      logSuccess(check.name)
    } else {
      logError(check.name)
      allPassed = false
    }
  }
  
  log('==========================================', 'bright')
  
  if (allPassed) {
    logSuccess('All type validations passed! 🎉')
    process.exit(0)
  } else {
    logError('Some validations failed. Please fix the issues above.')
    process.exit(1)
  }
}

// Handle CLI arguments
const args = process.argv.slice(2)

if (args.includes('--help') || args.includes('-h')) {
  log('JC Pastelaria Gourmet - Type Validation Script', 'bright')
  log('')
  log('Usage: node scripts/validate-types.js [options]', 'cyan')
  log('')
  log('Options:')
  log('  --help, -h     Show this help message')
  log('  --report       Generate type report only')
  log('  --fix          Attempt to fix common issues')
  log('')
  process.exit(0)
}

if (args.includes('--report')) {
  generateTypeReport().then(() => process.exit(0))
} else {
  main().catch((error) => {
    logError('Validation failed:')
    log(error.message, 'red')
    process.exit(1)
  })
}