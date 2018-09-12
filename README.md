# eslint-formatter-idea

Friendly formatter for ESLint that outputs click-through source links for common IDEs. Similar to
`eslint-formatter-friendly` but with much more compact output.

Install with Npm/Yarn and use with:

```sh
eslint --format @wisersolutions/eslint-formatter-idea <PATHS>
```

_Note: When using this in IDEA (WebStorm), create a "Run Configuration" to make use of this.
The links are not click-through when run by hand in a Terminal._