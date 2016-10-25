Ext.define('SearchApp.store.Users', {
    extend: 'Ext.data.Store',

    alias: 'store.users',

    model: 'SearchApp.model.Users',
    autoLoad: true,

    proxy: {        
        type: 'ajax',
        url: '/resources/users.json',
        reader: {
            type: 'json'
        }
    }
});
