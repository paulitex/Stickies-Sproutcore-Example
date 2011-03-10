// ==========================================================================
// Project:   StickiesComplete
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete */
sc_require("mixins/repositionable");

/** @class

  @extends SC.View
*/

StickiesComplete.StickyView = SC.View.extend(StickiesComplete.Repositionable, {
    childViews: 'textedit close'.w(),
    classNames: ["sticky"],
    layout: {
        width: 219,
        height: 210
    },

    mouseUp: function() {
        // save new position
        this.content.set('y', this.get('layout').top);
        this.content.set('x', this.get('layout').left);
        StickiesComplete.stickiesController.comeToFront(this.get('content'));
        // commit position to store
        StickiesComplete.stickiesController.saveSticky(this.get('content'));
        return YES;
    },
    
    mouseDownCallback: function(event) {
        this.adjust('zIndex', StickiesComplete.stickiesController.get("content").mapProperty("z").max() + 1);
    },

    render: function(context, firstTime) {
        sc_super();
        this.adjust('left', this.getPath('content.x'));
        this.adjust('top', this.getPath('content.y'));
        this.adjust('zIndex', this.getPath('content.z'));
    },

    mouseEntered: function() {
        if (!SC.platform.touch) {
            this.get('close').adjust('opacity', 1);
        }
    },

    mouseExited: function() {
        if (!SC.platform.touch) {
            this.get('close').adjust('opacity', 0);
        }
    },

    close: SC.ButtonView.design(SC.Animatable, {
        style: {
            opacity: 0
        },
        transitions: {
            opacity: 0.4
        },
        layout: {
            top: 12,
            width: 15,
            height: 15,
            left: 15
        },
        init: function() {
            if (SC.platform.touch) {
                this.style.opacity = 1;
            }
            else {
                this.adjust('opacity', 0);
            }
            sc_super();
        },
        classNames: ["stickyClose"],
        title: 'X',
        action: 'destroySticky',
        target: 'StickiesComplete.stickiesController'
    }),

    textedit: SC.TextFieldView.design({
        layout: {
            centerY: -5,
            centerX: 0,
            width: 165,
            height: 160
        },
        isTextArea: YES,
        classNames: ["stickyText"],
        mouseDown: function(event) {
            this.get("parentView").mouseDownCallback();
            sc_super();
        },
        keyUp: function(event) {
            return NO;
        },
        keyDown: function(event) {
            return NO;
        },
        commitEditing: function() {
            StickiesComplete.stickiesController.comeToFront(this.getPath('parentView.content'));
            StickiesComplete.stickiesController.saveSticky(this.getPath('parentView.content'));
        },
        valueBinding: '*parentView.content.content'

    })
});
