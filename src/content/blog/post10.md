---
title: "Why the hate for Java?"
description: "I used to laugh when people rolled their eyes after hearing I use Java. Then I actually learned it. Here’s what I discovered moving from front-end frameworks to the world of Spring Boot and JPA."
pubDate: "Oct 1 2025"
heroImage: "/blog/post10/java-hate.webp"
tags: ["code"]
badge: "NEW"
---

A couple of months ago, I went to a coding meetup in northern Colorado with professionals from all over the area. There were experts from all sorts of different fields, and I had a ton of great conversations with multiple people. One moment though really stood out. I was talking about the technologies I use, React, TypeScript, Postgres, and Java with Spring Boot. As soon as I mentioned Java, the person I was speaking with cringed and said, “I’m sorry.”

This isn’t the first time I’ve heard that kind of reaction toward Java and the Spring Boot ecosystem. Starting out primarily as a front-end developer, I wondered if Java was the backend equivalent of jQuery, something considered outdated or clunky. Were there newer, better, easier to use technologies out there that I should focus on instead?

After plenty of long conversations with seasoned developers, I’ve come to realize that Java is a proven, battle-tested technology still used by countless companies across the world including Amazon, Google, Netflix, IBM, LinkedIn, and Oracle. In this post, I want to share my thoughts on using Java, the good, the bad, and where I’m looking to go next with the technology.

## My background: a front-end developer moving into the backend world

To give you more context, my background is in graphic design. I got my start in development by building HTML headers and styling them with CSS. That’s where I learned about semantic HTML, how to structure web pages and design them to fit a client’s brand and aesthetic. The next logical step was learning JavaScript and jQuery, which introduced me to interactivity on the web and the basics of JavaScript development.

Later, I started using front-end frameworks like React and Vue.js. That was a game-changer for me. Adding interactivity became easier than ever, but more importantly, I learned the concepts of state and data, the lifeblood of an application. Then came TypeScript, which fundamentally changed the way I look at code. I could finally see how data flowed through an app, ensuring consistency and predictability while preventing mismatched data errors. This was also when I began to understand API-first design and the importance of clean, reliable data throughout the system.

I didn’t follow a traditional path into software development. Because of that, I have some unique perspectives on Java and development in general, which shape the thoughts I’m sharing here.

## Coming from JavaScript, the strictness is refreshing

Coming from the JavaScript world, switching to a strict, compiled language like Java is surprisingly refreshing. In JavaScript, the code almost always runs, even when it shouldn’t. You can accidentally pass a string where a number is expected, forget to return a value, or reference something undefined, and the browser will shrug and do its best to keep going.

At first, that freedom feels great. You can move fast, prototype instantly, and fix things later. But as your codebase grows, that same freedom becomes chaos. You start chasing down runtime bugs, undefined values, and logic errors that only show up in certain situations. The language doesn’t protect you from yourself.

Then you switch to Java, and it’s like walking into a well-organized workshop after years of working in a cluttered garage. Everything has a place. The compiler doesn’t just run your code, it guards it. If you miss a null check, call a method on the wrong type, or forget to handle an exception, the compiler stops you. It can feel frustrating at first, but you quickly realize it’s saving you from entire categories of bugs.

That strictness forces you to think more deeply about your code before you ever run it. You start defining clear contracts between classes and methods. You think about data structures, error handling, and how objects interact. In JavaScript, you can “just make it work.” In Java, you make it correct.

What’s funny is that I used to think JavaScript with TypeScript gave me enough safety, and in many ways, it does. But Java takes that safety to another level. The compiler isn’t a linter politely warning you, it’s a bouncer that won’t let bad code through the door. The result is code that’s not only more reliable, but also easier to maintain months later because every relationship and data flow is clearly defined.

There’s something satisfying about that kind of discipline. It slows you down at first, but it speeds you up later, because when your app compiles, you know it works.

## Like driving a car, you step on the gas and it goes... But don’t always know the internals

One downside of frameworks like Spring Boot—on both the frontend and backend—is that they can feel like driving a car. You press the gas, and it goes. You may have a general sense of what’s happening under the hood, but not the full picture. That can become a problem when something breaks.

It still amazes me how much Spring Boot does for you, almost to a fault. It’s an incredibly powerful framework, but it comes with a lot of decisions and configurations. Spring Boot simplifies this with sensible defaults so you can focus on your own logic. That’s fantastic for getting from point A to point B quickly, but if you try to go off the beaten path or do something unconventional, you might hit roadblocks.

Then you add in dependencies that integrate with APM tools or external systems. Suddenly, I can see all the endpoints being called and their performance metrics. I can connect to a database with one line in a YAML file. I can autowire a transaction manager without writing 200 lines of boilerplate. I can mark a method with @Transactional, and it will automatically roll back if an exception occurs. I can configure secrets from AWS or validate JWTs in just a few lines of YAML.

These conveniences are incredible, but they’re hard to fully appreciate if you’ve never had to do it all manually.

## JPA feels like black magic

If you’ve never worked with an ORM before, JPA (Java Persistence API) can feel like magic. You define your entity classes, add some annotations, and suddenly Java is creating tables, relationships, and queries for you. It’s wild how much it handles behind the scenes. But that magic can also bite you if you don’t fully understand what’s going on.

When I first started working with JPA and Hibernate, I couldn’t believe how much was happening automatically. The idea that you could define a @OneToMany or @ManyToOne relationship and have it generate the foreign keys, join tables, and SQL statements for you felt like black magic. You can fetch objects from the database, modify them like normal Java classes, and the framework handles persisting those changes back to the database.

It reminds me of learning React hooks or TypeScript’s generics. At first it’s confusing and feels overly complicated, but once it clicks, you realize just how much power it gives you. JPA is like that, it’s not magic, but it can feel like it when everything starts to work smoothly.

## So why do people hate Java

Even after all its improvements, Java still carries a reputation for being too verbose. That verbosity shows up everywhere, in type declarations, in boilerplate, and in how often you find yourself repeating the same patterns just to get something simple done.

When you come from a higher-level language like Python, writing Java can feel like you’re speaking in slow motion. You end up declaring types that the compiler already knows, wrapping logic in temporary classes, and building factory patterns just to instantiate objects. It’s like you’re saying the same thing three different ways before the JVM finally nods in agreement.

Boilerplate is another pain point. Whenever you’re writing the same code over and over. Getters, setters, equals, hashCode, constructors, you start to lose sight of the “smart” parts of your logic. The parts of the code that actually solve the problem get buried under layers of syntax and repetition.

Then there’s Java’s “everything is a class” mentality. Want a simple utility function? Wrap it in a class. Want a helper for testing? Another class. Need a quick transformation? Implement an interface. Sure, you can work around it with anonymous classes or reflection, but both approaches add even more code, and even more noise.

The irony is that modern IDEs like IntelliJ can infer almost everything for you. They generate methods, imports, and type hints instantly. If the tools are that smart, you’d think the language runtime could be too. But that’s just part of Java’s DNA: explicit, rigid, and determined to make sure you write out every detail, whether you want to or not.

Still, that strictness is also part of what makes Java so stable. It’s not fast to write, but it’s incredibly predictable to maintain, and that’s a trade-off many large systems are built on.

## Where I’m going next with Java

As I continue building out backend systems, I’ve realized how much I enjoy working with Java and Spring Boot. I’m starting to see why so many large-scale systems are written in it. The language forces you to think carefully about structure, contracts, and types. The frameworks, while heavy at times, give you immense power once you understand them.

That said, I’m also curious about what’s next. I’ve been exploring Kotlin to see how it improves on some of Java’s verbosity and Spring’s complexity. Kotlin in particular, feels like the bridge between Java and TypeScript. Concise, expressive, and type-safe.

But for now, Java has earned my respect. It’s not flashy, and it’s not the “cool” language at meetups, but it’s stable, reliable, and endlessly scalable. I’ve learned that sometimes the technologies people make fun of are the ones quietly powering half the internet.

So, if someone at the next meetup scoffs when I say “Java,” I’ll probably just smile and keep building.
