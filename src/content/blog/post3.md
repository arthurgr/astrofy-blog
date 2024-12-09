---
title: "Extending Exisiting Design Systems"
description: "Throughout my career on worked on extending existing design sytems, and created custom improvemnts using exisitng functionality to fit the project needs. Here are some tips, issues I've ran into, and things I wish I would have known when starting."
pubDate: "Nov 14 2024"
heroImage: "/blog/post3/desingSystems.webp"
tags: ["code"]
badge: "NEW"
---

Throughout my career, I've worked on lean development teams. We didn’t have the time or resources to develop our own custom design component systems, so we had to leverage open-source design systems to move quickly and meet deadlines. When I say design systems, I mean something more robust than a utility library like Tailwind CSS—options with more built-out, opinionated components like Material UI, Ant Design, Bootstrap, and others. These systems provided a solid base for building UIs, but you would almost undoubtedly run into scenarios where the pre-built components weren’t enough. In these cases, you would need to build custom code on top of the existing components to meet the business’s needs. Some might argue that you could just contribute to the open-source project, but many of these situations were highly specific to the business, making it impractical to contribute them. I’ve created plenty of these custom component extensions, as well as used others' attempts, and I'd like to share with you common issues I've encountered, tips for making things more reusable and flexible, and how to create a better developer experience for developers down the road.

## Configuration over wrappers, stay away from set prop args 

```javascript
const greeting = 'Hello, World!';
console.log(greeting);
```

## Removing built in presentation and layout logic

## Making things more complex makes your component less reuseable

## Separation of Concerns (SoC)




