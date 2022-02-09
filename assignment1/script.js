class Utils {
  isNull = (value) => {
    // write logic to find whether value is null
    return (value === null);
  };

  isUndefined = (value) => {
    // write logic to find whether value is undefined
    return (typeof value === "undefined");
  };

  isNumber = (value) => {
    // write logic to find whether value is number
    return (typeof value === "number");
  };

  isString = (value) => {
    // write logic to find whether value is string
    return (typeof value === "string");
  };

  isBoolean = (value) => {
    // write logic to find whether value is boolean value
    return typeof value === "boolean";
      
  };

  isObject = (value) => {
    // write logic to find whether value is an object
    return ((typeof value === "object") && !(Array.isArray(value)) && !(value === null));
  };

  isArray = (value) => {
    // write logic to find whether value is an Array
    return Array.isArray(value);
  
  };

  isTruthy = (value) => {
    // Write logic to find whether value is truthy
    if (value) {
      return true;
    }
    return false;
  };

  isFalsy = (value) => {
    // Write logic to find whether value is falsy
    if (value) {
      return false;

    }
    return true;
  };

  isFunction = (value) => {
    return typeof value === "function";
  };

  keys = (value) => {
    /**
     * Write logic to only extract keys from an object and create an array of keys
     * value: {'animal': 'lion', 'age': 6}
     * output: ['animal', 'age']
     */

    return Object.keys(value);
  };

  values = (value) => {
    /**
     * Write logic to only extract values from an object and create an array of values
     * value: {'animal': 'lion', 'age': 6}
     * output: ['lion', 6]
     */
    return Object.values(value);
  };

  size = (value) => {
    /**
     * Find the size of value
     * value: array
     */

    return value.length;
  };

  filter = (collection, predicate) => {
    /**
     * collection: array
     * predicate: function
     * usage: filter([1,2,3,4], (item) => { return item !== 2})
     */

    if (!this.isArray(collection)) {
      return [];
    }

    if (!this.isFunction(predicate)) {
      return collection;
    }

    const result = [];
    for (const item of collection) {
      const truthy = predicate(item);

      if (truthy) {
        result.push(item);
      }
    }
  };
}

async function fetchDefinition() {
  /**
   * Write code to make an api call to get json
   * URL: https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json;
   */
  const response = await fetch("https://raw.githubusercontent.com/karthik-hr/js-utils/master/definition.json");
  var temp = await response.json();

  return temp.data;
}

function findStats(definition) {
  const instance = new Utils();

  const stats = {
    numberOfItems: 0,
    null: 0,
    undefined: 0,
    numbers: 0,
    strings: 0,
    boolean: 0,
    objects: 0,
    array: 0,
    truthy: 0,
    falsy: 0,
  };

  /**
   * Write loop here to update stats
   *
   *
   */
  stats.numberOfItems = instance.size(definition);
  var data = []
  for (let items of definition) {
    for (let it of instance.values(items)) {
      data.push(it);
    }
  }
  //console.log(data)
  for (let items of data) {
    if (instance.isNull(items)) {
      stats.null += 1;
    }
    if (instance.isUndefined(items)) {
      stats.undefined += 1;
    }
    if (instance.isNumber(items)) {
      stats.numbers += 1;
    }
    if (instance.isString(items)) {
      stats.strings += 1;
    }
    if (instance.isBoolean(items)) {
      stats.boolean += 1;
    }
    if (instance.isObject(items)) {
      stats.objects += 1;
    }
    if (instance.isArray(items)) {
      stats.array += 1;
    }
    if (instance.isTruthy(items)) {
      stats.truthy += 1;
    }
    if (instance.isFalsy(items)) {
      stats.falsy += 1;
    }

    
  }
  //console.log(stats);

  return stats;
}

function render(stats) {
  const items = Object.keys(stats);
  const ul = document.createElement("ul");
  for (const item of items) {
    const li = document.createElement("li");
    li.innerHTML = `${item}: ${stats[item]}`;
    ul.appendChild(li);
  }
  const root = document.getElementById("stats");
  if (root) {
    root.innerHTML = "";
    root.append(ul);
  }
}

async function main() {
  const definition = await fetchDefinition();

  const stats = findStats(definition);
  render(stats);
}

main();
