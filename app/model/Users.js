Ext.define('SearchApp.model.Users', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id',          type: 'int' },
        { name: 'firstName',   type: 'string'},
        { name: 'lastName',    type: 'string' },
        { name: 'email',       type: 'string'},
        { name: 'date',        type: 'date'},
        { name: 'state',   type: 'string'}
    ]    

});