//
//  AppDelegate.swift
//  SlackPack
//
//  Created by Jonathan Warner on 3/16/15.
//  Copyright (c) 2015 Jonathan Warner. All rights reserved.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    @IBOutlet weak var window: NSWindow!
    var viewController : ViewController!



    func applicationDidFinishLaunching(aNotification: NSNotification) {
        // Insert code here to initialize your application
        self.viewController = ViewController(nibName:"ViewController", bundle:nil)
        self.window.contentView = self.viewController!.view
        self.window.contentViewController = self.viewController!
        self.viewController!.view.frame = self.window.contentView.bounds;

    }

    func applicationWillTerminate(aNotification: NSNotification) {
        // Insert code here to tear down your application
    }


}
