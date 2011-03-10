// ==========================================================================
// Project:   StickiesComplete.Sticky
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete localStorage*/

/** @class


  @extends SC.Record
  @version 0.1
*/
StickiesComplete.LocalStorageDataSource = SC.DataSource.extend(
{

    fetch: function(store, query) {
        store.loadRecords(query.get('recordType'), this.get("stickies"));
        store.dataSourceDidFetchQuery(query);
    },

    retrieveRecord: function(store, storeKey) {
        var sticky = this.get("stickies").find(function(sticky) {
            return sticky.guid === store.idFor(storeKey);
        });
        store.dataSourceDidComplete(storeKey, sticky);
    },

    createRecord: function(store, storeKey) {
        var stickyHash = store.readDataHash(storeKey);
        stickyHash["guid"] = Math.floor(Math.random() * 10000000);
        var stickies = this.get("stickies");
        stickies.pushObject(stickyHash);
        this.set("stickies", stickies);
        store.dataSourceDidComplete(storeKey, stickyHash, stickyHash['guid']);
    },

    destroyRecord: function(store, storeKey) {
        var stickies = this.get("stickies").filter(function(sticky) {
            return sticky.guid !== store.idFor(storeKey);
        });
        this.set("stickies", stickies);
        store.dataSourceDidDestroy(storeKey);
    },

    updateRecord: function(store, storeKey) {
        console.log("Update record!");
        var stickyHash = store.readDataHash(storeKey);
        var stickies = this.get("stickies").filter(function(sticky) {
            return sticky.guid !== store.idFor(storeKey);
        });
        stickies.pushObject(stickyHash);
        this.set("stickies", stickies);
        store.dataSourceDidComplete(storeKey, stickyHash);
    },

    stickies: function(key, value) {
        if (value !== undefined) localStorage["stickies"] = JSON.stringify(value);
        var jsonArray = localStorage["stickies"];
        if (!jsonArray) jsonArray = localStorage["stickies"] = "[]";
        return JSON.parse(jsonArray);
    }.property()

});
