# Sri CLI

A CLI tool to install UI components from the `@repo/ui` package.

## Installation

### Local Installation

```bash
# Navigate to the sri-cli directory
cd packages/sri-cli

# Build the CLI tool
node build.js

# Link the package globally (optional)
npm link
```

### NPM Installation

```bash
# Install globally from npm
npm install -g sri-cli
```

## Usage

### List available components

```bash
# If installed
sri-cli list

# Or run directly
node index.js list
```

### Install a specific component

```bash
# If installed
sri-cli install button

# Or run directly
node index.js install button

# Specify an output directory
sri-cli install button -o ./my-components
```

### Install all components

```bash
# If installed
sri-cli install-all

# Or run directly
node index.js install-all

# Specify an output directory
sri-cli install-all -o ./my-components
```

## Available Components

- button
- card
- code
- mbui

## Options

- `-o, --output <directory>`: Specify the output directory (default: current directory)
- `-h, --help`: Display help information
- `-V, --version`: Display version information

## Publishing to NPM

To publish this package to NPM:

```bash
# Navigate to the sri-cli directory
cd packages/sri-cli

# Login to npm (if not already logged in)
npm login

# Publish the package
npm publish
```

Make sure to update the package.json with your information before publishing.
