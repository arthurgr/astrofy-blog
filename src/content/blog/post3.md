---
title: "Extending exisiting design systems"
description: "Throughout my career on worked on extending existing design sytems, and created custom improvemnts using exisitng functionality to fit the project needs. Here are some tips, issues I've ran into, and things I wish I would have known when starting."
pubDate: "Dec 21 2024"
heroImage: "/blog/post3/desingSystems.webp"
tags: ["code"]
---

Throughout my career, I've worked on lean development teams. We didn’t have the time or resources to develop our own custom design component systems, so we leveraged open-source design systems to move quickly and meet deadlines. When I say design systems, I mean something more robust than a utility library like Tailwind CSS—options with more built-out, opinionated components like Material UI, Ant Design, Bootstrap, and others.

These systems provided a solid base for building UIs, but you almost always encounter scenarios where the pre-built components aren’t enough. In these cases, you need to build custom code on top of the existing components to meet business needs.

Some might argue that you could contribute to the open-source project, but many of these situations are highly specific to the business, making contributions impractical. I’ve created plenty of custom component extensions and used others' attempts. I'd like to share common issues I've encountered, tips for making things more reusable and flexible, and how to create a better developer experience. I'll use Ant Design and React for examples, but these methodologies can be applied to all design systems and front-end libraries. 

## Use configurations over prop containers

One major issue I've encountered is when developers create a prop container around an existing design system component. For example:

```javascript
import React from 'react';
import { Table } from 'antd';

const MyCustomTable = ({ data, columns }) => {
    return (
        <Table
            data={data}
            columns={columns}
            mode="multiple"
            size="small"
            bordered={true}
        />
    )
}

export default MyCustomTable;
```

In most cases, we want to display tables consistently throughout our app. MyCustomTable achieves this, but the problem arises when we need to access other props of the Ant Design Table component or override a prop. The wrapper now acts as a blocker. I've seen developers try to work around this by adding more and more props to MyCustomTable, sometimes even naming these props differently from the original library's prop names.

```javascript
import React from 'react';
import { Table } from 'antd';

const MyCustomTable = ({ data, columns, multiselect, shouldRowHover }) => {
    return (
        <Table
            data={data}
            columns={columns}
            mode="multiple"
            size="small"
            bordered={true}
            // newly added props that mistach original documentation
            mode={multiselect}
            rowHoverable={shouldRowHover}
            // etc, etc
        />
    )
}

export default MyCustomTable;
```

This quickly becomes messy. In every case I've encountered, developers failed to document the props correctly, and the custom component accumulated countless props, trying to keep up with all the unique situations the app presented. It's also a pain to trace the code path to match props, instead of just using the original design system's documentation.

### How to fix this

One approach I've used is to implement a configuration hook instead of wrappers. For example:

```javascript
import React from 'react';

const useMyCustomTableConfig = () => {
    return {
        mode: "multiple",
        size: "small",
        borderd: true,
        mode: "tags",
        rowHoverable: true,
    }
}

export default useMyCustomTableConfig;
```

When we want to use this, we can spread the hook on the original Table component like so:

```javascript
import React from 'react';
import { Table } from 'antd';
import useMyCustomTableConfig from './useMyCustomTableConfig.js';

const App: React.FC = () => {
    const data = [...];
    const columns = [...];

    return (
        <Table
            data={data}
            columns={columns}
            {...useMyCustomTableConfig()}
        />
    )
};

export default App;
```
### Addressing the original issues

With this approach, all of the original design system's props remain available, the naming aligns with the design system's documentation, and we can override configurations if necessary:

```javascript
import React from 'react';
import { Table } from 'antd';
import useMyCustomTableConfig from './useMyCustomTableConfig.js';

const App: React.FC = () => {
    const data = [...];
    const columns = [...];
    
    const overrides = {
        size: 'large'
    }

    return (
        <Table
            data={data}
            columns={columns}
            {...useMyCustomTableConfig(), ...overrides}
             // new prop we didnt think we would need until now
             rowClassName="custom-situation-classname"   
        />
    )
};

export default App;
```

Although we may believe we can anticipate every requirement for our custom component, I guarantee unforeseen situations will arise as we build our app. We need to be as flexible as possible to avoid hampering development down the road.

## Removing built in presentation and layout logic

Another painful issue I have encountered is when developers include presentation and layout logic in a custom component. For example:

```javascript
import React from 'react';
import { Select } from 'antd';

const MyCustomSelect = () => {
    return (
        <Row>
            <Col span={12}>
                <Select />
            </Col>
        </Row>
    )
}

export default MyCustomSelect;
```

Not only does this go against our first point, but including the layout logic in our component immediately makes it less flexible for different situations. Instead, keep the layout logic outside of the component like so:

```javascript
import React from 'react';
import { Table, Row, Col } from 'antd';
import MyCustomSelect from './MyCustomSelect.js';

const App: React.FC = () => {
    return (
        <Row>
            <Col span={12}>
                <MyCustomSelect />
            </Col>
            <Col span={12}>
                <Table />
            </Col>
        </Row>
    )
};

export default App;
```

Extracting the layout logic from the component now makes it much more flexible for various dynamic layout scenarios.

## Atomic Design, a great mehodology to follow

One of the best concepts I've learned is the concept of atomic design, especially when building out apps with existing design systems. Atomic design is a methodology introduced by Brad Frost that helps teams create robust, scalable, and consistent design systems by breaking down interfaces into smaller, reusable building blocks.

### Why atomic design?

The main idea behind atomic design is to build UIs starting from the smallest, most fundamental components and gradually combine them to create more complex structures. This approach mirrors the way matter is constructed in nature—from atoms to molecules, organisms, templates, and finally, complete pages.

By adopting atomic design, developers and designers can achieve the following benefits:
- Consistency: Reusable components ensure the same design patterns are applied across different parts of the application.
- Scalability: Smaller components can be reused and assembled in new ways, making it easier to expand features and maintain code.
- Efficiency: Changes to atomic-level components propagate throughout the system, reducing the need to duplicate effort.
- Collaboration: Design and development teams can work more closely by sharing a common language and structure for the interface.

### Implementing Atomic Design in Development

In practical terms, when building React or frontend applications, atomic design can be applied by organizing components into folders that correspond to each stage of the methodology. This results in a clear and maintainable file structure, such as:
```
components/
  atoms/
    Button.tsx
    Input.tsx
  molecules/
    SearchBar.tsx
  organisms/
    Header.tsx
  templates/
    HomePageTemplate.tsx
  pages/
    HomePage.tsx
```

By structuring code in this way, changes to a single button component, for instance, can be reflected throughout all molecules, organisms, and pages that depend on it.

## Making things more complex makes your component less reuseable

This is more of a general theme. The more situations you try to fit with a custom extended component, the less flexible it will be. Sure, the component will fit the situation at hand, but as soon as you try to use it in another situation, it will fall apart and become less and less flexible if you want to use it elsewhere. Deciding whether to split a component apart is truly an art and very situational, but keeping things as simple as possible and addressing one concern will benefit you in the long run.

## Finally...

What are some tips and tricks you've learned when extending or adapting design systems to fit different use cases? Are there specific strategies or best practices that have helped you maintain flexibility while still achieving the desired results? Do you disagree with any of the points I've made or have a different perspective on handling design system extensions? I'd love to hear your thoughts, experiences, and feedback. Feel free to share them with me on Twitter – let's continue the conversation!
