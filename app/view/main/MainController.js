/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('SearchApp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onChangeDate: function(me, newValue, oldValue, eOpts){
        
        function compareDates(dateField){        
            var dateCmpt = this.lookup(dateField),
                date = dateCmpt.getValue();

            if (!date) return;

            if (dateField == 'endDateField' && newValue.valueOf() > date.valueOf()) {                
                Ext.Msg.alert('Внимание!', 'Начальная дата не должна быть позже конечной');
                me.setValue(oldValue); 
            } else if (dateField == 'startDateField' && newValue.valueOf() < date.valueOf()){                
                Ext.Msg.alert('Внимание!', 'Конечная дата не должна быть раньше начальной');
                me.setValue(oldValue);  
            }                    
        }

        var name = me.getName();

        if (!newValue) return;

        if (name == 'startDateField') {
            compareDates.call(this,'endDateField');
        } else {
            compareDates.call(this,'startDateField');
        }
    },

    onFindButtonClick: function(){
        var form = Ext.getCmp('form').getForm(),
            fieldValues = form.getFieldValues(),
            start = fieldValues.startDateField && fieldValues.startDateField.valueOf(),
            end = fieldValues.endDateField && fieldValues.endDateField.valueOf(),            
            store = Ext.getCmp('resultGrid').getStore();

        if (form.isValid()){
            store.clearFilter();
            store.filter(function(item){
                var counter = 0,
                    date = item.data.date.valueOf(),
                    comparison = (!start && !end) || (!end && start < date) ||
                                 (!start && date < end) || (start < date && date < end);

                for (var prop in fieldValues) {
                  if (fieldValues[prop] && !prop.startsWith('start') && !prop.startsWith('end')) counter++;
                }            
                for (var data in item.data){
                  if (fieldValues[data]){
                    switch (typeof fieldValues[data]){
                        case 'number':
                            if (fieldValues[data] === item.data[data]) counter--;
                            break;
                        case 'string':
                            if (fieldValues[data].toLowerCase() == item.data[data].toLowerCase()) counter--;
                            break;
                    }
                  };
                }            
                if (!counter && comparison) return true;
                else return false;
            });
        } else {
            Ext.Msg.alert('Внимание!', 'Заполните поля формы корректными значениями');
        }
    },

    onResetButtonClick: function(){
        var form = Ext.getCmp('form').getForm(),
            store = Ext.getCmp('resultGrid').getStore();

        store.clearFilter();
        form.reset();
    },

    onEnterPress: function(me, e, eOpt){
        if (e.getKey() == e.ENTER) {
            this.onFindButtonClick();
        }
    }

});
