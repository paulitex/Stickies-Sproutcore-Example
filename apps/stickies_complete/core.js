// ==========================================================================
// Project:   StickiesComplete
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
StickiesComplete = SC.Application.create(
/** @scope StickiesComplete.prototype */
{

    NAMESPACE: 'StickiesComplete',
    VERSION: '0.1.0',

    // This is your application store.  You will use this store to access all
    // of your model data.  You can also set a data source on this store to
    // connect to a backend server.  The default setup below connects the store
    // to any fixtures you define.
  
    // use Fixtures as data source
    store: SC.Store.create().from(SC.Record.fixtures)
    // use localStorage API as data source
    // store: SC.Store.create().from('StickiesComplete.LocalStorageDataSource')
  
    // TODO: Add global constants or singleton objects needed by your app here.
});
