#!/bin/bash

cd ..

for file in $(git diff --cached --name-only | grep -E '\.(js|jsx)$')
do
  git show ":$file" | ./client/node_modules/.bin/eslint --stdin --stdin-filename "$file"
  if [ $? -ne 0 ]; then
    echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run eslint."
    exit 1
  fi
done
