#!/usr/bin/env node

const fs = require('fs')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const ora = require('ora')
const symbols = require('log-symbols')
const handlebars = require('handlebars')

program
  .version(require('./package').version, '-v, --version')
  .command('create <name>')
  .alias('i')
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer
        .prompt([
          {
            name: 'templateType',
            message: ' select the type of template you want to create?',
            type: 'list',
            choices: ['基于vue3+vite+antd+ts的模板', '基于react+ant-design-pro+ts的模板'],
          },
          {
            name: 'author',
            message: 'please enter a author:',
          },
          {
            name: 'description',
            message: 'please enter a description:',
          }
        ])
        .then((answers) => {
          console.log(answers)
          const spinner = ora('正在下载模板...')
          spinner.start()
          let downloadPath = ''
          switch (answers.templateType) {
            case '基于vue3+vite+antd+ts的模板':
              downloadPath = 'direct:https://gitee.com/sunupdong/vue-antd-ts-vite-template.git#master'
              break
            case '基于react+ant-design-pro+ts的模板':
              downloadPath = 'direct:https://gitee.com/sunupdong/dong-ant-design-template.git#master'
              break
            default:
              spinner.fail(chalk.red('操作异常'))
          }
          download(downloadPath, name, { clone: true }, (err) => {
            if (err) {
              spinner.fail()
              console.error(symbols.error, chalk.red(`${err}下载模板失败，请检查您的网络连接，然后重试`))
              process.exit(1)
            }
            spinner.succeed(chalk.green(`下载成功, cd ${name} -> yarn install -> yarn serve`))
            const meta = {
              name,
              description: answers.description,
              author: answers.author,
            }
            const fileName = `${name}/package.json`
            const content = fs.readFileSync(fileName).toString()
            const result = handlebars.compile(content)(meta)
            fs.writeFileSync(fileName, result)
          })
        })
    } else {
      // 错误提示项目已存在，避免覆盖原有项目
      console.error(symbols.error, chalk.red('project had exist'))
    }
  })
  .on('--help', () => {
    console.log('  Examples:')
    console.log('    $ w init index')
    console.log()
  })

program.parse(process.argv)
