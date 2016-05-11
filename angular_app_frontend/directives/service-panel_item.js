/**
 * Created by Nem on 5/11/16.
 */
app.directive(servicePanelItem, function spanelItem (){
    return {
        itemList : '&=',
        templateUrl : '/static/partials/service-panel/panel-item',
        link : function (scope) {

        }
    }
})