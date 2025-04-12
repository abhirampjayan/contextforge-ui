#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the UI components
const UI_COMPONENTS_DIR = path.resolve(__dirname, '../../ui/src');

// Available components
const AVAILABLE_COMPONENTS = ['button', 'card', 'code', 'mbui'];

const program = new Command();

program
  .name('cf-cli')
  .description('CLI tool to install UI components')
  .version('1.0.0');

program
  .command('list')
  .description('List all available components')
  .action(() => {
    console.log(chalk.blue('Available components:'));
    AVAILABLE_COMPONENTS.forEach(component => {
      console.log(`  - ${component}`);
    });
  });

program
  .command('install')
  .description('Install a component')
  .argument('<component>', 'Component name to install')
  .option('-o, --output <directory>', 'Output directory', '.')
  .action(async (componentName, options) => {
    try {
      // Check if component exists
      if (!AVAILABLE_COMPONENTS.includes(componentName)) {
        console.error(chalk.red(`Error: Component "${componentName}" not found.`));
        console.log(chalk.yellow('Available components:'));
        AVAILABLE_COMPONENTS.forEach(component => {
          console.log(`  - ${component}`);
        });
        process.exit(1);
      }

      // Source and destination paths
      const sourcePath = path.join(UI_COMPONENTS_DIR, `${componentName}.tsx`);
      const outputDir = path.resolve(process.cwd(), options.output);
      const destPath = path.join(outputDir, `${componentName}.tsx`);

      // Ensure output directory exists
      await fs.ensureDir(outputDir);

      // Check if component file exists
      if (!await fs.pathExists(sourcePath)) {
        console.error(chalk.red(`Error: Component file "${sourcePath}" not found.`));
        process.exit(1);
      }

      // Read component file
      const componentContent = await fs.readFile(sourcePath, 'utf8');

      // Write component file to destination
      await fs.writeFile(destPath, componentContent);

      console.log(chalk.green(`Component "${componentName}" installed successfully to ${destPath}`));
    } catch (error) {
      console.error(chalk.red('Error installing component:'), error);
      process.exit(1);
    }
  });

program
  .command('install-all')
  .description('Install all components')
  .option('-o, --output <directory>', 'Output directory', '.')
  .action(async (options) => {
    try {
      const outputDir = path.resolve(process.cwd(), options.output);
      
      // Ensure output directory exists
      await fs.ensureDir(outputDir);
      
      // Install all components
      for (const component of AVAILABLE_COMPONENTS) {
        const sourcePath = path.join(UI_COMPONENTS_DIR, `${component}.tsx`);
        const destPath = path.join(outputDir, `${component}.tsx`);
        
        // Check if component file exists
        if (!await fs.pathExists(sourcePath)) {
          console.warn(chalk.yellow(`Warning: Component file "${sourcePath}" not found. Skipping.`));
          continue;
        }
        
        // Read component file
        const componentContent = await fs.readFile(sourcePath, 'utf8');
        
        // Write component file to destination
        await fs.writeFile(destPath, componentContent);
        
        console.log(chalk.green(`Component "${component}" installed successfully to ${destPath}`));
      }
      
      console.log(chalk.blue('All components installed successfully!'));
    } catch (error) {
      console.error(chalk.red('Error installing components:'), error);
      process.exit(1);
    }
  });

// Parse command line arguments
program.parse();

// If no arguments provided, show help
if (process.argv.length <= 2) {
  program.help();
}
