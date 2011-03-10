// ==========================================================================
// Project:   StickiesComplete.stickiesController
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete */

/** @class

  @extends SC.Object
*/
StickiesComplete.stickiesController = SC.ArrayController.create({

    destroySticky: function(source) {
        var stickyRecord = source.getPath('parentView.content');
        stickyRecord.destroy();
        stickyRecord.commitRecord();
    },

    newSticky: function() {
        // position new sticky to be randomly scattered around average of where stickies current are, with a starting
        // top/left offset of 30,30. Make new sticky come to front by setting zindex
        var maxX = 30,
        maxY = 30;

        StickiesComplete.stickiesController.content.forEach(function(sticky) {
            if (sticky.get('x') > maxX) maxX = sticky.get('x');
            if (sticky.get('y') > maxY) maxY = sticky.get('y');
        },
        this);

        var sticky = StickiesComplete.store.createRecord(StickiesComplete.Sticky, {
            x: Math.floor(((maxX / 2) * Math.random()) + (maxX / 2)),
            y: Math.floor(((maxY / 2) * Math.random()) + (maxY / 2)),
            content: ""
        });

        this.saveSticky(this.comeToFront(sticky));
    },

    saveSticky: function(sticky) {
        sticky.commitRecord();
    },

    // Maintaining Z-order
    comeToFront: function(sticky) {
        var ordered = this.get("content").sortProperty("z");
        ordered.forEach(function(item, index) {
            if (item !== sticky) {
                item.set("z", index);
                item.commitRecord();
            }
        },
        this);
        sticky.set('z', this.getPath('content.length'));
        sticky.commitRecord();
        return sticky;
    }

});
