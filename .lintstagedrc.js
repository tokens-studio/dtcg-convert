export default {
  '*.ts': ['eslint --fix', 'prettier --write', 'tsc --noEmit'],
  '*.md': ['prettier --write'],
  'package.json': ['npx prettier-package-json --write package.json'],
};
