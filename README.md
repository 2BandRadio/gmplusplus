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

gmplusplus invisibly appends an incremented value to any data stored with `GM_setValue`, ensuring that no two calls to `GM_setValue` are ever (*near enough*) storing the same data thereby guaranteeing that value listeners will always fire.




#### GM_addValueChangeListener ####

The function signature for `GM_addValueChangeListener` is now `GM_addValueChangeListener(name, callback, onDelete = true)`. The new optional argument `onDelete` enables or disables the firing of the listener upon value deletion. Checking for value deletion inside a callback is usually done by checking if the `curValue` parameter is `undefined` but because a value can be set to `undefined` without deleting it this method is not ideal for checking for deletion.

Therefore the function signature of the `callback` function has also changed and is now `callback(name, oldValue, newValue, remote, deleted)`. The new `deleted` parameter is boolean and will be `true` if the value has been deleted via a call to `GM_deleteValue`.




#### GM_deleteValue ####

The function signature for `GM_deleteValue` is now `GM_deleteValue(nameOrRegex)`. If `nameOrRegex` is a string the function call will function as normal but if `nameOrRegex` is a regex then all values that match will be deleted.
