# Angular Camp Game  
## NativeScript + Angular2 quick example

This project was created during the Angular Camp using NativeScript and Angular2. It was created by some GFT employees attending to the event and the support of NativeScript team.

It does not pretend to be a state of the art or a reference applciation but a simple scenario to play with and learn.

Our main focus was to experiment a bit with the base components, basic styling and simple (really simple) Angular2 concepts. 

Keep in mind that at this time the Compnent router is not yet ready to be used with Nativescript or a solution that rednders native UI. So we uses some tricks to bypass this. Should not be a susprise given Angular2 is in beta and so it is its support in NativeScript.

It is still a live project and some more experiments will happen on it. 

This demo was powered by NativeScript, supported by GFT and inspired by AngularCamp

<img src="https://worldvectorlogo.com/logos/nativescript.svg" alt="Nativescript"  width=80/>
<img src="https://www.gft.com/dam/jcr:172f6059-a8b4-4438-9b92-26a5effa38d6/GFT_logo_tiny.png" alt="GFT" width=200 />
<img src="http://angularcamp.org/images/AngularCamp-logo.png" alt="Camp" width=120 />

# Prerequisites

Install your native toolchain and NativeScript as described in the docs:

https://docs.nativescript.org/setup/quick-setup

# Prepare project

```sh
$ npm install
```

# Add platforms(s)

1. `tns platform add android`
2. `tns platform add ios`

# Run

Android devices or emulators:

```sh
tns run android
```

or iOS...

```sh
tns run ios
```

#License
Just in case you build the next Angry Birds on top of this software you whould know that we would be more than happy. 

As we need to pick one... we go with MIT

The MIT License (MIT)
Copyright (c) 2016 

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
