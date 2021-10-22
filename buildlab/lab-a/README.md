Lab A
======

Testing typescript build tools.

## check types and run the script

```
npx tsc-watch buildlab/lab-a/index.ts --outDir ./buildlab/lab-a/gitignore-generated --onSuccess "node ./buildlab/lab-a/gitignore-generated/index.js"
```

## check types independently

```
npx tsc-watch --project buildlab/tsconfig.json --noEmit
```
