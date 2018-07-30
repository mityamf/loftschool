/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        let elem = array[i];
        
        fn(elem, i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var newArray = [];
    
    for (let i = 0; i < array.length; i++) {
        let elem = array[i];
        
        newArray[i] = fn(elem, i, array);
    }
    
    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    var result, i;
    
    if (initial === undefined) {
        result = array[0];
        i = 1;
    } else {
        result = initial;
        i = 0;
    }
    for (i; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }
    
    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var result = [];
    
    Object.keys(obj).forEach(function(item) {
        result.push(item.toUpperCase());
    })
    
    return result;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    var result = [];

    if (to > array.length) {
        to = array.length;
    }
    if (from < 0 && Math.abs(from) > array.length) {
        from = - array.length;
    }

    if (from >= 0 && to > 0) {
        for (let i = from; i < to; i++) {
            result.push(array[i]);
        }
    } else if (from < 0 && to < 0) {
        for (let i = array.length - 1 + to; i >= array.length + from; i--) {
            result.unshift(array[i]);
        }
    } else if (from < 0 && to > 0) {
        for (let i = array.length + from; i < to; i++) {
            result.push(array[i]);
        }
    } else if (from >= 0 && to < 0) {
        for (let i = from; i < array.length + to; i++) {
            result.push(array[i]);
        }
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    var newObj = new Proxy(obj, {
    
        set(target, prop, value) {
            target[prop] = value * value;
   
            return true;
        }
    });

    return newObj;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
