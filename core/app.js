#!/usr/bin/env node

const { Command } = require("commander");
const ApiGenerator = require("./APIGenerator");
const Chalk = require("chalk");
const program = new Command();

program
	.name("Matrix")
	.description("An express extension for faster development")
	.version("0.1");

program
	.command("create")
	.description("Create api")
	.argument("<name>", "Your api name")
	.option("--api", "Create api")
	.action(async (option) => {
		if (option.length < 3) {
			console.log(Chalk.red("Name must greater than 3 charcter"));
		} else {
			const name = option.toLowerCase();
			await ApiGenerator(name);
		}
	});

program.parse();
