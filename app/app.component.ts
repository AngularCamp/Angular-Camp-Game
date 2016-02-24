/*The MIT License (MIT)
Copyright (c) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


import 'reflect-metadata';
import {Component} from 'angular2/core';
import {RouteConfig} from "angular2/router";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {Page} from 'ui/page';


import {SplashPage} from "./pages/splash/splash.component";
import {SetupPage} from "./pages/setup/setup.component";
import {ReadyPage} from "./pages/ready/ready.component";
import {GamePage} from "./pages/game/game.component";
import {ResultsPage} from "./pages/results/results.component";

import {GameEngine} from "./shared/game-engine";
import "./livesync-patch";


@Component({
    selector: "main",
    directives: [NS_ROUTER_DIRECTIVES],
    providers: [GameEngine],
    template: `
      <StackLayout verticalAlignment="center"><page-router-outlet></page-router-outlet></StackLayout>
      `
})
@RouteConfig([
    { path: "/", component: SplashPage, as: "Splash" },
    { path: "/Setup", component: SetupPage, as: "Setup" },
    { path: "/Ready", component: ReadyPage, as: "Ready" },
    { path: "/Game", component: GamePage, as: "Game" },
    { path: "/Results", component: ResultsPage, as: "Results" }
])

export class AppComponent {
  constructor(page: Page) {
    page.actionBar.title = "AngularCamp Game";
  }
}
