A Vue 3 component created to search and filter an array with arrow keys available

Quickly integrate a select capable of filtering the text you input, displaying results instantly.

## **Use**

```
const array  = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
...
 <b-select label="Options:" :data="array" />
```
"Beautiselect also accepts an array of objects with properties. For this, it's necessary to add the **display-property** attribute to display the required value."
```
const array  = [{
    id: 1,
    name: 'Option 1'
  },
  {
    id: 2,
    name: 'Option 2'
  },
  {
    id: 3,
    name: 'Option 3'
  },
  {
    id: 4,
    name: 'Option 4'
  }]
...
 <b-select label="Options:" :data="array" display-property="name" />
```
