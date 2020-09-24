(() => {
  const __GM = {
    increments: [0, 0],
    valueListeners: [],
    eventListeners: [],
    GM_getValue: GM_getValue,
    GM_setValue: GM_setValue,
    GM_addValueChangeListener: GM_addValueChangeListener,
    GM_removeValueChangeListener: GM_removeValueChangeListener
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
  
  /**
   *  name: see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   *
   *  callback: function(index, name, oldValue, newValue, remote, deleted, invocations)
   *    index: index of value change listener (indices are reused when able)
   *    name: see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   *    oldValue: see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   *    newValue: see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   *    remote: see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   *    deleted: true if a call to GM_deleteValue is what triggered the listener
   *    invocations: the number of times the listener has been invoked
   *
   *  returns: index of value change listener (indices are reused when able)
   */
  GM_addValueChangeListener = (name, callback) => {
    const index = (() => {
      for (let i = 0; i < __GM.valueListeners.length; i++)
        if (__GM.valueListeners[i] === null)
          return i;
      
      return __GM.valueListeners.length;
    })();
    
    const listener = __GM.GM_addValueChangeListener(name, (name, oldValue, newValue, remote) => {
      oldValue = oldValue || { value: undefined };
      newValue = newValue || { value: undefined };
      const deleted = !GM_listValues().includes(name);
      
      callback(index, name, oldValue.value, newValue.value, remote, deleted, ++__GM.valueListeners[index].invocations);
    });
    
    __GM.valueListeners[index] = {
      callback: callback,
      listener: listener,
      invocations: 0
    };
    
    return index;
  }
  
  /**
   *  index: index of value change listener (indices are reused when able)
   */
  GM_removeValueChangeListener = (index) => {
    if (__GM.valueListeners[index] !== null) {
      __GM.GM_removeValueChangeListener(__GM.valueListeners[index].listener);
      __GM.valueListeners[index] = null;
    }
  }

  /**
   *  name: name of the event
   *
   *  callback: function(index, name, remote, invocations)
   *    index: index of event listener (indices are reused when able)
   *    name: name of the event
   *    remote: see https://violentmonkey.github.io/api/gm/#gm_addvaluechangelistener
   *    invocations: the number of times the event listener has been invoked
   *
   *  returns: index of event listener (indices are reused when able)
   */
  GM_addEventListener = (name, callback) => {
    const index = (() => {
      for (let i = 0; i < __GM.eventListeners.length; i++)
        if (__GM.eventListeners[i] === null)
          return i;
      
      return __GM.eventListeners.length;
    })();

    const listener = __GM.GM_addValueChangeListener(name, (name, oldValue, newValue, remote) => {
      const deleted = !GM_listValues().includes(name);

      if (!deleted)
        callback(index, name, remote, ++__GM.eventListeners[index].invocations);
    });

    __GM.eventListeners[index] = {
      callback: callback,
      listener: listener,
      invocations: 0
    };

    return index;
  }

  /**
   *  index: index of event listener (indices are reused when able)
   */
  GM_removeEventListener = (index) => {
    if (__GM.eventListeners[index] !== null) {
      __GM.GM_removeValueChangeListener(__GM.eventListeners[index].listener);
      __GM.eventListeners[index] = null;
    }
  }

  /**
   *  name: name of event to invoke
   */
  GM_invokeEvent = (name) => {
    __GM.GM_setValue(name, __GM.increments[1]++);
  }

  unsafeWindow.GMplusplus = "2009241044";
})();
