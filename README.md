# gmplusplus

Value change listeners created with Violentmonkey's `GM_addValueChangeListener` may sometimes fail to fire when a previously deleted value is recreated with the same data it held before.

```
GM_addValueChangeListener("myvalue", (name, oldValue, newValue, remote) => {
  ...
});

GM_setValue("myvalue", "hello, world!");
GM_deleteValue("myvalue");
GM_setValue("myvalue", "hello, world!"); // may fail to fire
```

gmplusplus invisibly appends an incremented value to any data stored with `GM_setValue`, ensuring that no two calls to `GM_setValue` are ever (*near enough*) storing the same data thereby guaranteeing (*near enough*) that value listeners will always fire.




#### Changes ####

Some GM_* function signatures have changed and some new GM_* functions have been created. See userscript for notes.
