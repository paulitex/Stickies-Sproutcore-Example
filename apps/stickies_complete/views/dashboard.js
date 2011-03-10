// ==========================================================================
// Project:   StickiesComplete.DashboardView
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete */
sc_require("views/sticky");
/** @class

  (Document Your View Here)

  @extends SC.View
*/
StickiesComplete.DashboardView = SC.View.extend(
/** @scope StickiesComplete.DashboardView.prototype */
{

    childViews: ['stickies', 'newStickyButton'],

    stickies: SC.CollectionView.extend(
    /** @scope StickiesComplete.StickiesView.prototype */
    {
        classNames: ["stickyContainer"],
        contentBinding: 'StickiesComplete.stickiesController.arrangedObjects',
        exampleView: StickiesComplete.StickyView,

        // customizations
        acceptsFirstResponder: YES,
        // get spacebar action back from collection View
        insertText: function() {
            return NO;
        }
    }),

    newStickyButton: SC.ButtonView.design({
        layout: {
            height: 20,
            bottom: 10,
            width: 40,
            left: 10
        },
        classNames: ['stickyControl'],
        title: '+',
        titleMinWidth: 0,
        action: 'newSticky',
        target: 'StickiesComplete.stickiesController'
    })

});
