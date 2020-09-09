(() => {
  const __GM = {
    increment: 0,
    GM_getValue: GM_getValue,
    GM_setValue: GM_setValue,
    GM_deleteValue: GM_deleteValue,
    GM_addValueChangeListener: GM_addValueChangeListener
  }

  GM_getValue = (name, defaultValue) => {
    return __GM.GM_getValue(name, { value: defaultValue }).value;
  }

  GM_setValue = (name, value) => {
    __GM.GM_setValue(name, {
      value: value,
      __t: __GM.increment++
    });
  }

  GM_deleteValue = (name) => {
  	if (typeof name === "string") {
  		__GM.GM_deleteValue(name);
  	} else {
  		GM_listValues().forEach((valueName) => {
  			if (name.test(valueName)) {
  				__GM.GM_deleteValue(valueName);
  			}
  		});
  	}
  }

  GM_addValueChangeListener = (name, callback, onDelete = true) => { 
    return __GM.GM_addValueChangeListener(name, (name, pre, cur, remote) => {
      pre = pre || { value: undefined };
      cur = cur || { value: undefined };
      const deleted = !GM_listValues().includes(name);
      
      if (!(!onDelete && deleted) && (pre.value !== cur.value))
        callback(name, pre.value, cur.value, remote, deleted);
    });
  }
})();
