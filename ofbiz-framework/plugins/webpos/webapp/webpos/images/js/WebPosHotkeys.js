WebPosHotkeys = {
    hotkeys: [],
    
    on: function (type, data, fnCode, fn, label) {
        var arr = [type, data, fnCode, fn, label];
        this.hotkeys.push(arr);
    }
}