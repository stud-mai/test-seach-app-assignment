/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SearchApp.view.main.Main', {
    extend: 'Ext.panel.Panel',
    controller: 'main',
    reference: 'mainView',
    //title: 'SearchApp',
    bodyPadding: 10,
    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [{
            xtype: 'form',
            id: 'form',
            items:[{
                xtype: 'fieldset',
                title: 'Параметры фильтрации',
                name: 'filterParams',
                width: '100%',    
                layout: 'hbox',
                style: {
                    background: 'white'
                },
                defaults: {
                    padding: '0 10 0 0'
                },
                items: [{
                    width: 200,
                    defaults: {
                        labelWidth: 50
                    },
                    items:[{
                        xtype: 'numberfield',
                        fieldLabel: 'ID',
                        name: 'id',
                        reference: 'id',
                        width: '100%',
                        minValue: 1,
                        listeners: {
                            specialkey: 'onEnterPress'
                        }
                    },{
                        xtype: 'combobox',
                        fieldLabel: 'Штат',
                        name: 'state',
                        reference: 'state',
                        store: [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ],
                        width: '100%'                        
                    }]
                },{
                    flex: 1,
                    items:[{
                        xtype: 'textfield',
                        fieldLabel: 'Имя',
                        name: 'firstName',
                        reference: 'firstName',
                        width: '100%',
                        listeners: {
                            specialkey: 'onEnterPress'
                        }
                    },{
                        xtype: 'datefield',
                        fieldLabel: 'Начальная дата',
                        name: 'startDateField',
                        reference: 'startDateField',
                        format: 'd/m/Y',                   
                        width: '100%',
                        listeners: {
                            change: 'onChangeDate'
                        }
                    }]
                },{
                    flex: 1,
                    items:[{
                        xtype: 'textfield',
                        fieldLabel: 'Фамилия',
                        name: 'lastName',
                        reference: 'lastName',
                        width: '100%',                        
                        listeners: {
                            specialkey: 'onEnterPress'
                        }
                    },{
                        xtype: 'datefield',
                        fieldLabel: 'Конечная дата',
                        name: 'endDateField',
                        reference: 'endDateField',
                        format: 'd/m/Y',                
                        width: '100%',
                        listeners: {
                            change: 'onChangeDate'
                        }
                    },{
                        xtype: 'container',                        
                        layout: {
                            type:'hbox',
                            pack: 'end'
                        },
                        items: [{
                            xtype: 'button',
                            text: 'Найти',
                            name: 'findButton',
                            margin: '0 10 0 0',
                            listeners: {
                                click: 'onFindButtonClick'
                            }                    
                        },{
                            xtype: 'button',
                            text: 'Сбросить фильтр',
                            name: 'resetButton',                  
                            handler: 'onResetButtonClick'
                        }]
                    }]
                }]
            }]
        },{
            xtype: 'grid',
            flex: 1,
            id: 'resultGrid',
            //title: 'Результаты фильтрации',            
            reference: 'resultGrid',
            requires: [
                'SearchApp.store.Users'
            ],
            store: {                
                type: 'users'
            },
            columns: [
                { text: 'ID', dataIndex: 'id'},
                { text: 'Имя', dataIndex: 'firstName', width: 250 },
                { text: 'Фамилия', dataIndex: 'lastName', width: 250 },
                { text: 'E-mail', dataIndex: 'email', flex: 1},
                { text: 'Штат', dataIndex: 'state'},
                { text: 'Дата регистрации', dataIndex: 'date', flex: 1, renderer: Ext.util.Format.dateRenderer('H:i:s d/m/Y')}
            ]
        }        
    ]
});
