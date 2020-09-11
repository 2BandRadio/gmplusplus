(() => {
  const __GM = {
    increments: [0, 0],
    onces: {},
    GM_getValue: GM_getValue,
    GM_setValue: GM_setValue,
    GM_addValueChangeListener: GM_addValueChangeListener
  }

  GM_getValue = (name, defaultValue) => {
    return __GM.GM_getValue(name, { value: defaultValue }).value;
  }

  GM_setValue = (name, value) => {
    __GM.GM_setValue(name, {
      value: value,
      __t: __GM.increments[0]++
    });
  }

  GM_addValueChangeListener = (name, callback, once = false, onDelete = true) => {
    const listenerId = `${__GM.increments[1]++}`;
    
    const listener = __GM.GM_addValueChangeListener(name, (name, pre, cur, remote) => {
      pre = pre || { value: undefined };
      cur = cur || { value: undefined };
      const deleted = !GM_listValues().includes(name);
      
      if (!(!onDelete && deleted) && (pre.value !== cur.value)) {
        if (once)
          GM_removeValueChangeListener(__GM.onces[listenerId]);
        
        callback(name, pre.value, cur.value, remote, deleted);
      }
    });
    
    if (once)
      __GM.onces[listenerId] = listener;
    
    return listener;
  }

  unsafeWindow.GMplusplus = "2019111713";
})();
