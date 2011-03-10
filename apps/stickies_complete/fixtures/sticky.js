// ==========================================================================
// Project:   StickiesComplete.Sticky Fixtures
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete */

sc_require('models/sticky');

StickiesComplete.Sticky.FIXTURES = [{
    x: 600,
    y: 0,
    z: 1,
    content: ""
},
{
    x: 90,
    y: 400,
    z: 20,
    content: "A note short reminder to myself"
},
{
    x: 1000,
    y: 100,
    z: 300,
    content: "This is a really long degenerate note. This is a really long degenerate note.This is a really long degenerate note.This is a really long degenerate note.This is a really long degenerate note."
}].map(function(item, index) {
    // items need guids..
    item.guid = (index + 1); // because db indexes start at 0 not 1 for better consistency
    return item;
});