#!/usr/bin/env node

const program = require("commander");
const fs = require("fs");

let generatedFiles = [];

program
  .arguments("<model>")
  .option("-m, --model [directory]", "Model directory name")
  .option("-c, --controller [directory]", "Controller directory name")
  .option("-r, --router [directory]", "Router directory name")
  .option("-p, --repository [directory]", "Repository directory name")
  .option("-s, --schema [directory]", "Schema directory name")
  .parse(process.argv);

const modelName = program.args[0];

if (!modelName) {
  console.error("Error: Model name is required.");
  process.exit(1);
}

const modelDirectory = program.model || "model";
const controllerDirectory = program.controller || "controller";
const routerDirectory = program.router || "router";
const repositoryDirectory = program.repository || "repository";
const schemaDirectory = program.schema || "schema";

function writeFile(directory, fileName, content) {
  const filePath = `${directory}/${fileName}`;
  fs.writeFileSync(filePath, content);
  generatedFiles.push(filePath);
  console.log(`File created: ${filePath}`);
}

function generateFile(directory, fileName, content) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  const fileContent = content.replace(/{{modelName}}/g, modelName);

  writeFile(directory, fileName, fileContent);
}

// Generate Model File
generateFile(
  modelDirectory,
  `${modelName}.ts`,
  `import { Model } from "sequelize-typescript";
export class {{modelName}} extends Model {}`
);

// Generate Controller File
generateFile(
  controllerDirectory,
  `${modelName}Controller.ts`,
  `export class {{modelName}}Controller {}`
);

// Generate Router File
generateFile(
  routerDirectory,
  `${modelName}Routes.ts`,
  `import { Router } from "express";
const router = Router();
export default router;`
);

// Generate Repository File
generateFile(
  repositoryDirectory,
  `${modelName}Repository.ts`,
  `export class {{modelName}}Repository {}`
);

// Generate Schema File
generateFile(
  schemaDirectory,
  `${modelName}Schema.ts`,
  `export const {{modelName}}Schema = {};`
);

program
  .command("undo")
  .description("Undo changes made by make:model command")
  .action(() => {
    generatedFiles.forEach((filePath) => {
      try {
        fs.unlinkSync(filePath);
        console.log(`File removed: ${filePath}`);
      } catch (err) {
        console.error(`Error removing file: ${filePath}`, err);
      }
    });

    // Clear the list of generated files
    generatedFiles = [];
  });

program.parse(process.argv);
