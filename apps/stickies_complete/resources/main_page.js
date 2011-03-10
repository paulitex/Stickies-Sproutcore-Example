// ==========================================================================
// Project:   StickiesComplete - mainPage
// Copyright: ©2011 Paul Lambert
// ==========================================================================
/*globals StickiesComplete */
sc_require("views/dashboard");

// This page describes the main user interface for your application.  
StickiesComplete.mainPage = SC.Page.design({

    // The main pane is made visible on screen as soon as your app is loaded.
    // Add childViews to this pane for views to display immediately on page 
    // load.
    mainPane: SC.MainPane.design({
        childViews: 'dashboard'.w(),

        dashboard: StickiesComplete.DashboardView.design({
            classNames: ["background"],
            layout: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        })
    })

});
