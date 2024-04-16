A Vue 3 component created to search and filter an array with arrow keys available

Quickly integrate a select capable of filtering the text you input, displaying results instantly.

## **Use**

#### **Import**
```
import vue3beautiselect from 'vue3-beautiselect'
```

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

To view the list, you can click the down arrow button or use the 'arrowdown' key while in the select. Then, to navigate through the list, you can use 'arrowup' and 'arrowdown'. Finally, to select an option, click or press Enter.
Additionally, you can add a placeholder to indicate an example or data, just like you would in an input.

#### **Use CSS styles**
At the moment, only a few CSS styles are accepted. It is expected that it can be customized mostly.

```
const options = {
    borderColor: "#739321",
    borderRadius: "0px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px"
}

<b-select label="Options:" :data="array"  :custom-styles="options" />
```
To adjust the width, you can simply add the 'width' attribute.
```
<b-select label="Options:" :data="array" width="300px" />
```
It also supports dark mode; to activate it, simply add the 'dark' attribute.
```
<b-select label="Options:" :data="array" dark />
```

#### **Example**
```
const options = {
    borderColor: "#739321",
    borderRadius: "0px",
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingLeft: "5px"
}
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
<b-select label="Options:" :data="array" display-property="name"  width="300px" :custom-styles="options" placeholder="Search" v-model="value" dark />
```
