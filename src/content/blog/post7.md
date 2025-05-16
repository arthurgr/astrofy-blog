---
title: "Callbacks, React Props, And Component Reusability"
description: "Discover how to use callback props to create flexible, reusable React components, and learn best practices for defining and invoking callbacks to decouple component logic from external state management."
pubDate: "May 14 2025"
heroImage: "/blog/post7/callback.webp"
tags: ["code"]
badge: "NEW"
---

While at work, I was asked to implement a new feature that required a date picker as part of a form. When planning, the first question was: are there any elements in our current stack that we can reuse? After a quick search through the codebase, I found a date range filter that had been tailored to a specific use case. This presented a great opportunity to generalize the component and make it easier to reuse in multiple contexts. React is all about reusability. As an application grows, generalizing components helps eliminate headaches later and maintains a clear, consistent codebase.

## The Existing Code

I’ve removed all the extra props, styling wrappers, default values, error handling, and other context-specific logic so you can zero in on the core date‑range picker functionality. What remains is a minimal DateRangeFilter component:
```typescript tsx
import React from 'react';
import { DatePicker } from 'antd';

interface DateRange {
    startDate: Dayjs;
    endDate: Dayjs;
}

export interface DateRangeFilterProps {
    setFilters: React.Dispatch<React.SetStateAction<DateRange>>;
}

export const DateRangeFilter = ({ setFilters }: DateRangeFilterProps) => {
    return (
        <DatePicker.RangePicker
            onChange={(dates: DateRange) => setFilters(dates)}
        />
    );
};
```
In a ReportsPage component, we import dayjs and set up local state to track the selected start and end dates. We pass the setFilters function to DateRangeFilter, allowing the picker to update that state. Below the picker, we render a paragraph showing the chosen range in YYYY‑MM‑DD format.
```typescript tsx
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangeFilter } from './DateRangeFilter';

interface DateRange {
    startDate: Dayjs;
    endDate: Dayjs;
}

export default function ReportsPage() {
    const [filters, setFilters] = useState<DateRange>({
        startDate: dayjs().subtract(1, 'month'),
        endDate: dayjs(),
    });

    return (
        <div>
            <DateRangeFilter
                onChange={setFilters}
            />
            <p>
                Showing data from{' '}
                {filters.startDate.format('YYYY-MM-DD')} to{' '}
                {filters.endDate.format('YYYY-MM-DD')}.
            </p>
        </div>
    );
}
```
This worked fine in its original context: setFilters updated the filter state, and other parts of the file referenced that state. But when I tried to reuse it elsewhere, it fell short. The setFilters prop was too specific to this scenario, and the component depended on that particular state setter to function.

```typescript tsx
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangeFilter } from './DateRangeFilter';

interface AnalyticsFilters {
    dateRange: { startDate: Dayjs; endDate: Dayjs };
    status?: 'active' | 'archived';
}

export function AnalyticsPage() {
    const [filters, setFilters] = useState<AnalyticsFilters>({
        dateRange: { startDate: dayjs().subtract(7, 'days'), endDate: dayjs() },
        status: 'active',
    });

    return (
        // ❌ Type error: 
        //   Argument of type
        //   '(value: SetStateAction<AnalyticsFilters>) => void'
        //   is not assignable to parameter of type
        //   'Dispatch<SetStateAction<{ startDate: Dayjs; endDate: Dayjs }>>'
        <DateRangeFilter setFilters={setFilters} />
    );
}
```
## Callbacks for Flexibility

I wanted to reuse DateRangeFilter and make it flexible for both cases. A callback function is the perfect way to achieve that. According to MDN, “A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.” (https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

Looking at the original DateRangeFilter, let’s update it to make things more flexible:

```typescript tsx
import React from 'react';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';

interface DateRange {
    startDate: Dayjs;
    endDate: Dayjs;
}

export interface DateRangeFilterProps {
    onChange: (dates: DateRange) => void;
}

export const DateRangeFilter = ({ onChange }: DateRangeFilterProps) => {
    return (
        <DatePicker.RangePicker
            onChange={onChange}
        />
    );
};
```
The updated DateRangeFilter no longer relies on a predetermined state and is now flexible enough to handle many other scenarios

With this change, you can pass any handler, such as dispatching Redux actions, integrating with form libraries like Formik or React Hook Form, or triggering analytics events whenever the date range changes. By moving state management out and using a generic callback, DateRangeFilter becomes a versatile building block that fits a variety of architectures and workflows.
```typescript tsx
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangeFilter } from './DateRangeFilter';

interface DateRange {
    startDate: Dayjs;
    endDate: Dayjs;
}

export default function ReportsPage() {
    const [filters, setFilters] = useState<DateRange>({
        startDate: dayjs().subtract(1, 'month'),
        endDate: dayjs(),
    });

    return (
        <div>
            <DateRangeFilter
                value={filters}
                // The callback lets us update state from inside the component
                onChange={(dates) => setFilters(dates)}
            />
            <p>
                Showing data from{' '}
                {filters.startDate.format('YYYY-MM-DD')} to{' '}
                {filters.endDate.format('YYYY-MM-DD')}.
            </p>
        </div>
    );
}
```
In our AnalyticsPage, the filter state includes both a dateRange and a status flag. By using the generic onChange callback, we can merge the newly selected dates into our existing state object without touching the other properties. This shows how the same DateRangeFilter can slot into pages with far more complex state shapes. Simply pass in a custom handler that knows how to update the surrounding context.

```typescript tsx
import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DateRangeFilter } from './DateRangeFilter';

interface AnalyticsFilters {
    dateRange: { startDate: Dayjs; endDate: Dayjs };
    status?: 'active' | 'archived';
}

export function AnalyticsPage() {
    const [filters, setFilters] = useState<AnalyticsFilters>({
        dateRange: { startDate: dayjs().subtract(7, 'days'), endDate: dayjs() },
        status: 'active',
    });

    return (
        <DateRangeFilter onChange={(dates) => {
                // Now we can update even more complex state
                setFilters({
                    dateRange: dates,
                    status: filters.status === 'active' ? 'active' : 'archived',
                });
            }} 
        />
    );
}
```
With this callback in place, we can access the component’s state and handle it in much more dynamic ways. Because the DateRangeFilter no longer owns its own state, you can
- Merge the selected dates into more complex filter objects,
- Dispatch Redux or Context API updates on every change,
- Trigger data fetching or analytics events when a new range is picked, and
- Write simple unit tests by mocking the onChange handler instead of mounting a full parent.

## Wrapping Up

By refactoring `DateRangeFilter` to accept a generic `onChange` callback, we’ve decoupled the component from any specific state shape and made it truly reusable across different pages and contexts. This pattern keeps your components focused on rendering and event handling, while delegating state management to their parent—resulting in cleaner, more maintainable code. What other components in your codebase could you refactor with callback props to unlock the same flexibility?
