function check_order(list) {
  let check_list = list.slice()
  check_list.pop()
  return check_list.every(function(element, index) {
    return element < list[index+1]
  })
}
fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },
    each: function(list, iteratee) {
      if (Array.isArray(list)) {
        list.forEach(
          function (element, index, list) {
            iteratee(element, index, list);
          }
        );
        return list;
      } else if (typeof list === "object") {
        for (const key in list) {
          iteratee(list[key], key, list);
        }
        return list;
      } else {
        alert("Wrong input type")
      }
    }, //end
    map: function(list, iteratee) {
      if (Array.isArray(list)){
        let new_list = []
        list.forEach(
          function(element, index, list) {
            new_list.push(iteratee(element, index, list));
          }
        );
        return new_list
      } else if (typeof list === "object") {
        let new_list = []
        for (const key in list) {
          new_list.push(iteratee(list[key], key, list));
        }
        return new_list;
      } else {
        alert("Wrong input type")
      }
    }, //end
    reduce: function(list, iteratee, memo) {
      if (Array.isArray(list)) {
        if (memo !== undefined) {
            list.forEach(
              function (element, index, list) {
                memo = iteratee(memo, element, index, list)
              }
            )
          return memo
        } else {
          list.forEach(
            function (element, index, list) {
              if (index === 0) {
                memo = element
              } else {
                memo = iteratee(memo, element, index, list)
              }
            }
          )
        return memo
        }
      } else {
        alert("Wrong input type")
      }
    }, //end
    find: function(list, predicate) {
      for (let i = 0; i < list.length; i++) {
        if (predicate(list[i])) {
          return list[i];
        }
      }
    }, //end
    filter: function(list, predicate) {
      let result = []
      list.forEach(
        function (element) {
          if (predicate(element)) {
            result.push(element)
          }
        }
      )
      return result;
    }, //end
    sortBy: function(list, iteratee) {
      let new_list = list.map(function(element) {
        if (typeof element === "object") {
          return element[iteratee]
        } else {
          return iteratee(element)
        }
      })
      while (!check_order(new_list)) {
        for (let i = 0; i < list.length - 1; i++) {
          if (new_list[i] > new_list[i + 1]) {
            let old_first = list[i];
            let new_first = new_list[i];
            new_list[i] = new_list[i + 1];
            new_list[i + 1] = new_first;
            list[i] = list[i + 1];
            list[i + 1] = old_first;
          }
        }
      }
      return list;
    }, //end
    size: function(list) {
      let count = 0;
      for(const key in list) {
        count += 1;
      }
      return count;
    }, //end
    first: function(array, n) {
      if (n !== undefined) {
        if (n > 0) {
          return array.slice(0, n)
        } else if (n === 0){
          return []
        }
      } else {
        return array[0]
      }
    }, //end
    last: function(array, n) {
      if (n !== undefined) {
        if (n > 0) {
          return array.slice(array.length - n)
        } else if (n === 0){
          return []
        }
      } else {
        return array[array.length-1];
      }
    }, //end
    compact: function(array) {
      return array.filter(
        function (element) {
          return !!element
        }
      )
    }, //end
    flatten: function(array, shallow) {
      let new_array = []
      let count = 0
      function flattenHelper(array) {
        array.forEach(function(element) {
          if (typeof element !== 'object') {
            new_array.push(element)
          } else {
            count += 1
            if (shallow && count > 1) {
              new_array.push(element)
              count = 0
            } else {
              flattenHelper(element)
            }
          }
        })
      }
      flattenHelper(array)
      return new_array;
    }, //end
    uniq: function(array, isSorted, iteratee) {
      if (iteratee === undefined) {
        let new_array = array.slice()
        let result = []
        array.forEach(
          function (element) {
            if (!result.includes(element)) {
              result.push(element)
            }
          }
        )
        return result;
      } else {
        let iteratee_array = array.map(function(element) {return iteratee(element)})
        let new_array = array.slice()
        let result_iteratee = []
        let result = []
        iteratee_array.forEach(
          function (iteratee, index) {
            if (!result_iteratee.includes(iteratee)) {
              result.push(new_array[index])
              result_iteratee.push(iteratee)
            }
          }
        )
        return result;
      }
    }, //end
    keys: function(object) {
      let prop_array = []
      for (const key in object) {
        prop_array.push(key);
      }
      return prop_array;
    },//end
    values: function(object) {
      let prop_array = []
      for (const key in object) {
        prop_array.push(object[key]);
      }
      return prop_array;
    },//end
    functions: function(obj) {
      return Object.getOwnPropertyNames(obj).sort();
    },//end
    
    bind: function(func, obj, greeting) {
      return function() {
        Object.assign(this, obj)
        return func(greeting)
      }
    }
  }
})()
