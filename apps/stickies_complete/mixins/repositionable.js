// ==========================================================================
// Project:   StickiesComplete
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete SCUI */

/** @mixin
*   Add to a view to make repostionable on screen. 
*	Intercepts mouseDragged and mouseDown events, use define mouseDraggedCallback and mouseDownCallback
*	respectively to define additional mouse-drag/down behaviours without clobbering these ones
*/

StickiesComplete.Repositionable = {

    touchStart: function(evt) {
        return this.mouseDown(evt);
    },

    touchEnd: function(evt) {
        return this.mouseUp(evt);
    },

    touchesDragged: function(evt) {
        return this.mouseDragged(evt);
    },

    mouseDragged: function(evt) {
        var info = this._mouseDownInfo;
        // handle X direction
        this.adjust('left', this._checkX(info.x + (evt.pageX - info.pageX), (info.width / 2)));
        // // handle Y direction
        this.adjust('top', this._checkY(info.y + (evt.pageY - info.pageY), (info.height / 2)));
		
        if (SC.typeOf(this.mouseDraggedCallback) === SC.T_FUNCTION) {
            return this.mouseDraggedCallback();
        }
        return YES;
    },

    mouseDown: function(evt, preventCallback) {
        var rect = this.computeFrameWithParentFrame(null);
        this._mouseDownInfo = {
            // save mouse pointer loc for later use
            pageX: evt.pageX,
            pageY: evt.pageY,
            // save layout info 
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
        };
        if (!preventCallback && SC.typeOf(this.mouseDownCallback) === SC.T_FUNCTION) {
            return this.mouseDownCallback(evt);
        }
        else return YES;
    },

    checkBounds: function(key) {
        if (!this.get('parentView')) return; // guard against nulls, no point in check if no parentView
        // recompute bounds, so don't get abandoned off screen
        var rect = this.computeFrameWithParentFrame(null);
        // handle X direction
        this.adjust('left', this._checkX(rect.x, (rect.width / 2)));
        // // handle Y direction
        this.adjust('top', this._checkY(rect.y, (rect.height / 2)));
    }.observes("*parentView.frame"),

    _checkX: function(proposed, halfwidth) {
        return this._checkBound(proposed, halfwidth, YES);
    },

    _checkY: function(proposed, halfheight) {
        return this._checkBound(proposed, halfheight, NO);
    },

    _checkBound: function(proposed, half, isWidth) {
		if (!this.get('parentView')) return proposed;
        var bound, parentRect = this.get('parentView').computeFrameWithParentFrame(null);

        bound = (half * -1); // can only go 'half' off screen
        if (proposed < bound) {
            proposed = bound;
        }
        bound = isWidth ? parentRect.width: parentRect.height;
        bound = bound - half;
        if (proposed > bound) {
            proposed = bound;
        }
        return proposed;
    }
};
