---
layout: post
title: Weird but awesome JavaScript
category: Learning
---

I've been programming something or the other in JavaScript for more than a year now, but I still did not have a clear understanding of what it really is, and how it works. What makes it so different than other languages, why browsers use it, etc.

But now, after some digging into how stuff works, I think I understand what it is. I had heard of Chrome's runtime V8, but I did not know what it really is. I had used callbacks, but did not know how they work. So this post tries to clarify the small misconceptions and incomplete information about these things.

As Wikipedia puts it, [JavaScript](https://en.wikipedia.org/wiki/JavaScript) is a **_high-level, dynamic, untyped, and interpreted programming language_**. But this statement doesn't do much. We need to explore more. JavaScript is popularly known to be a **_single-threaded non-blocking asynchronous concurrent language_** with a **_call stack_**, **_event loop_**, a **_callback queue_** and some **_APIs_**. But V8 only has a call stack and a **_heap_**. Weird! What about the other stuff? The event loop, the callback queue and the APIs? And how can it be single-threaded as well as concurrent simultaneously? There's something we are missing here.

As it turns out, the JavaScript runtimes (like V8) only have a heap for memory allocation, and a stack for contextual execution. The other things are the Web APIs in the browser, for instance the `setTimeout`, `AJAX`, `DOM` etc. So in a browser, JavaScript has the following structure:

![jsRunTime]({{site.baseurl}}/images/weird-awesome-javascript/chrome.png)

- A runtime like Chrome's V8, which has a heap and the call stack
- Web APIs provided by the browser, like `AJAX`, `setTimeout`, `DOM`
- A callback queue for events with callbacks, like `onLoad`, `onClick`, etc.
- and an *event loop* that does something we'll look at later

The example image above is the representation of Chrome's JavaScript environment. Notice that **_V8 Runtime (the big rectangular box)_** only has a call stack and a heap for memory allocation. The **_Web APIs_**, **_event loop_** and the **_callback queue_** are provided as external tools by the browser, and are not inherent to the V8 runtime. We'll try to look at each of the parts and understand how this works.

### What is the Call Stack?
So let's start with the call stack. What is this? Well, as we already know by now, JavaScript is single-threaded, which means it has a **single call stack**, which in turn means that it can do **_one thing at a time_**. This is the same as in an operating system, each process has the call stack, and each time a function is called it gets a new stack frame. Why a stack is used you ask? Because the call stack is fundamentally a data structure which keeps a record of where in the program is the execution going on. When the execution steps into a function, it is pushed on to the stack, and when a function returns after completion, it is popped off the stack, so we have to get back to the place from where this function call was made. Thus naturally, a stack data structure makes complete sense. Anyway, getting back to JavaScript, it's the same thing, and whenever the program throws some error, we can see the call stack in the browser console.

### So what is 'blocking'?
Ever heard statements like **_nodejs uses an event-driven I/O bound non-blocking_** model that makes it perfect for data-intensive, real-time applications? Those terms are not very helpful yet. Let's try to understand each term there.

- **Event-driven:** This is a programming paradigm in which the flow of the program is determined by events such as user actions (mouse clicks, key-press), or messages from other programs. For example: "*When the user makes a GET request, render the page `index.html`*". This is an event based trigger as we might say, where the event is the user sending a GET request and the trigger is the rendering of the page `index.html`.
- **I/O bound:** This refers to a condition where the time taken to complete a computation is determined primarily by the time period spent waiting for input/output operations to be completed. This is the opposite of a task being CPU bound, where the completion time is primarily determined by the time taken for the actual computation. So the rate at which the process progresses is limited by the speed of the I/O subsystem and not the CPU, hence it is good for data-intensive, real-time applications.
- **Blocking:** It is the condition when the call stack is occupied for long and the event loop is stuck because some function does not return until it has completed what it was doing, and it is taking a long time doing it. Since JS is singe threaded, a time taking operation, like making a network request blocks the subsequent code. The execution has to wait until the request is complete. This problem is avoidable (let's look at that later).

So JS in the browser is a problem if it is blocking, isn't it? Because say we make a network request, then we cannot click on things, submit forms, etc. because the browser is blocked now. **_But this does not happen! Why?_** Because we have **_asynchronous callbacks_** which solve this problem.

#### Is Concurrency a sham then?
So it's false that JavaScript can only do one thing at a time. It's true however that the JavaScript runtime can only do one thing at a time. But we can do things concurrently, because the browser is more than the runtime (refer to the image above).

Notice the arrows in the above image. The call stack can put things in the Web APIs, which push the callbacks into the callback queue once complete, and then comes the **_event loop magic_**. The event loop does the following:

{% highlight ruby %}
if the Call Stack is empty:
    take the first thing off the Callback Queue and
    push it onto the Call Stack of the runtime (V8)
{% endhighlight %}

The event loop keeps looking at the call stack and the callback queue, and does this simple job when it meets the condition above. There exists a tool where we can visualize this clearly. [Loupe](http://latentflip.com/loupe) helps visualize the whole process beautifully. Go put some code there and see what's happening. For example, we take the code below ([on Loupe](http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coJ0hpJyk7CgpzZXRUaW1lb3V0KGZ1bmN0aW9uIGNiYWNrKCkgewogICAgY29uc29sZS5sb2coJ1RoaXMgd2lsbCBydW4gYWZ0ZXIgc29tZSB0aW1lJyk7Cn0sIDMwMDApOwogCmNvbnNvbGUubG9nKCdCdXQgdGhpcyBydW5zIGJlZm9yZSB0aGUgY2FsbGJhY2suJyk7!!!)).

{% highlight js %}
console.log('Hi');

setTimeout(function cback() {
    console.log('This will run after some time');
}, 3000);

console.log('But this runs before the callback.');
{% endhighlight %}

Though the visualization makes it clear, let’s go through what's happening:

1. Step into the **`console.log('Hi');`** function, so it's pushed onto the call stack
1. **`console.log('Hi');`** returns, so it is popped off the stack
1. Step into the **`setTimeout`** function, so it's pushed onto the call stack
1. **`setTimeout`** is a part of the Web API, so the Web API handles that and sets a timer for **_3 seconds_**
1. The script continues, stepping into the **`console.log()` function in `line 7`**, pushing it onto the stack
1. `console.log()` of `line 7` returns, so it's popped off
1. The 3 second timer completes, so the callback **`cback()`** moves to the callback queue
1. The event loop checks if the call stack is empty. If it were not empty, it would wait. But because it is empty, the **`cback()`** is pushed from the callback queue onto the call stack.
1. **`console.log()` of `line 4`** is defined in **`cback()`**, so it is pushed onto the stack and when it returns, it's popped off the call stack.

The interesting thing to observe here is that **`setTimeout`** with the second argument as `3000` doesn't mean that the callback function will be called after 3 seconds. It means that it will be called **_whenever the call stack is empty after 3 seconds_**, which can also be never.

Try [this](http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coJ0hpJyk7CgpmdW5jdGlvbiBibG9ja2FnZSgpIHsKICAgIHdoaWxlKHRydWUpOwp9CgpzZXRUaW1lb3V0KGZ1bmN0aW9uIGNiYWNrKCkgewogICAgY29uc29sZS5sb2coJ1RoaXMgd2lsbCBydW4gYWZ0ZXIgc29tZSB0aW1lJyk7Cn0sIDMwMDApOwoKYmxvY2thZ2UoKTs%3D!!!) to understand the above statement:

{% highlight js %}
console.log("Hi");

function blockage() {
    while(true);
}

setTimeout(function cback() {
    console.log("This will run after some time");
}, 3000);

blockage();
{% endhighlight %}

As expected, **`cback()`** never makes it to the call stack because of **`blockage()`** and thus **`setTimeout`** fails to give us the desired thing after 3 seconds. The browser has to render the UI every `16.67 milliseconds (60 frames per second)`, and if there is blockage in the stack, it will not be able to render. So **_blocking the event loop_** actually means having some function on the stack that does not return well in time.

[This](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D) code on loupe gives the example of a more complex program, with an event handler defined for a button. The **`$.on('button', 'click', ...)`** Web API keeps waiting for events (clicks on the button) (an example showing the event-driven nature), and pushes the said function in the callback queue when we click the button below. The event loop takes care of things thereafter.

This helped me clarify and satisfy some fundamental questions about JavaScript and know how it actually works. Do watch **Philip Roberts**' talk on *event loops* [here](https://www.youtube.com/watch?v=8aGhZQkoFbQ).
