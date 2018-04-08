// js 学习
require("./style/init.css");
require("./style/app.css");
import vue from "vue"



var app = new vue({
    el: "#app",
    data() {
        return{
            title:"js学习",
            showlist:[
                {
                    name:"排序(使用sort函数)",
                    typeId:0,
                    type:[
                        {id:1,name:"倒序"},
                        {id:0,name:"正序"}
                    ],
                    value:'',
                    result:'',
                    methods:this.sortValue
                },{
                    name:"字符串反转(使用reverse函数)",
                    value:'',
                    result:'',
                    methods:this.reverseValue
                },
                {
                    name:"数组去重",
                    value:'',
                    result:'',
                    originalValue:'',
                    methods:this.removeRepeat
                },{
                    name:"超大数 Infinity 加法运算",
                    value:'',
                    value1:'',
                    result:'',
                    operator:"+",
                    originalValue:'',
                    methods:this.largeNumber
                },
                // {
                //     name:"矩阵相乘",
                //     value:'',
                //     value1:'',
                //     result:'',
                //     operator:"*",
                //     originalValue:'',
                //     methods:this.arrayMultiply
                // }
            ]
        }
    },
    methods: {
        //排序
        sortValue(val){
            //倒序 9-1
            if(val.typeId ==1){
                var result = val.value.split("").sort(function(s,t){
                        var a = s.toLowerCase();
                        var b = t.toLowerCase();
                        if(a < b) return 1;
                        if(a > b) return -1;
                        return 0;   
                })  
            }
            else{
                // 正序 1-9
               var result = val.value.split("").sort(function(s,t){
                    var a = s.toLowerCase();
                        var b = t.toLowerCase();
                        if(a < b) return -1;
                        if(a > b) return 1;
                        return 0;   
                })  
            }
            
            val.result = result.join("、");
        },

        //字符串反转
        reverseValue(val){
            var result = val.value.split("").reverse().join("、");
            val.result = result;
        },

        // 去重
        removeRepeat(val){
            var originalValue = val.value.split("");
            val.originalValue = originalValue;
            var arr = [];
            var obj = {};
            console.log(this.arr)
            for(let i = 0;i<originalValue.length;i++){
                obj[i] = originalValue[i];
            }
            for(let i in obj){
            
                if(arr.length===0){
                    arr.push(obj[i])
                }
                else{
                    let j=0
                    for(let k in arr){
                        if(arr[k] === obj[i]){
                            j++;
                        }
                        
                    }
                    if(j===0){
                        arr.push(obj[i])
                    }
                }
                
            }
            val.result = arr;
        },

        // 超大数 Infinity
        largeNumber(val){
            val.originalValue = '正常情况下：'+(Number(val.value)+Number(val.value1));
            var arr1 = val.value.split("");
            var arr2 = val.value1.split("");
            var result = []
            if(arr1.length>=arr2.length){
                let k =0;
                for(let i in arr1){
                    if(arr2.length-1-i <0){
                        var num = Number(arr1[arr1.length-1-i]) + k ;
                    }
                    else{
                        var num = Number(arr1[arr1.length-1-i]) + Number(arr2[arr2.length-1-i]) + k ;
                    }
                   
                    if(num>=10){
                        if(arr1.length-1-i ===0){
                            result.unshift(num)
                        }
                        else{
                            result.unshift(Number(num.toString().split("")[1]));
                            k = 1;
                        }
                        
                    }
                    else{
                        k = 0;
                        result.unshift(num)
                    }
                }
            }
            else{
                let k =0;
                for(let i in arr2){
                    if(arr1.length-1-i <0){
                        var num = Number(arr2[arr2.length-1-i]) + k ;
                    }
                    else{
                        var num = Number(arr2[arr2.length-1-i]) + Number(arr1[arr1.length-1-i]) + k ;
                    }
                   
                    if(num>=10){
                        if(arr2.length-1-i ===0){
                            result.unshift(num)
                        }
                        else{
                            result.unshift(Number(num.toString().split("")[1]));
                            k = 1;
                        }
                        
                    }
                    else{
                        k = 0;
                        result.unshift(num)
                    }
                }
            }
            val.result = "实际结果："+result.join("");
        },


        // 矩阵相乘
        arrayMultiply(){
            alert("矩阵")
        },


        //es6
        runPromise(){
            console.log(`点击`)
            let promise = new Promise((resolve,reject)=>{
                //console.log(`过两秒后的内容`)
                
                setTimeout(()=> {
                    // var flag = true;
                    
                    resolve(`过两秒后的内容`);
                    console.log(`hello`)
                },2000);
                
               
            })
            
            promise.then((response)=>{
                console.log(response)
            }).then(()=>{
                throw new Error("test")
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                console.log(`this is finally`)
            })
        //对象使用push
            var obj ={
                "1":'a',
                '2':'b',
                "h":"f",
                "length":4,
                'push':Array.prototype.push
            }
            obj.push('c')
            console.log(obj)
        },

        //构造函数
        runConstructor(name,age,job){
           
            var Person = function (name, age, job) {
                this.name = name;
                this.age = age;
                this.job = job;
                this.sayName = function() { alert(this.name) }
                // 解释下this与Person,this指的是当前的实例对象，而Person指的是这个函数本身。。。有点绕,this.__proto__ === Person.prototype
                //console.log(this) 
                console.log(Person.prototype.hello)
                //return undefined
               
            }
            Person.prototype.hello = "hello"
            var person1 = new Person(name, age, job);
            
            console.log(person1)//person1 为实例对象，它的__proto__继承Person.prototype,则他可以访问person1.constructor == Person
            console.log(person1.hello)
            console.log(Person.prototype)
            // var person2 = Person('Zaxlct', 28, 'Software Engineer');
            var obj={
                test:Person
            }
            var person2 = obj.test('Zaxlct', 28, 'Software Engineer');
            console.log(person2) //内部无return 怎person2为undefined
        //    function Person(){};
        //    console.log(Person)
        //     console.log(Person.prototype) //Person{}
        //     console.log(typeof Person.prototype) //Object
        //     console.log(typeof Function.prototype) // Function，这个特殊
        //     console.log(typeof Object.prototype) // Object
        //     console.log(typeof Function.prototype.prototype) //undefined

            var a ='abc',
            b = {a:1,b:2},
            c = [1,2,3],
            d = null,
            e = undefined,
            f = 123,
            g = function(){
                alert('函数')
            },
            h = true



            console.log(`a-${typeof a}`)
            console.log(`b-${typeof b}`)
            console.log(`c-${typeof c}`)
            console.log(`d-${typeof d}`)
            console.log(`e-${typeof e}`)
            console.log(`f-${typeof f}`)
            console.log(`g-${typeof g}`)
            console.log(`h-${typeof h}`)

            console.log(a)
            console.log(b.__proto__.constructor == b)
            console.log(c)
            console.log(d)
            console.log(e)
            console.log(f)
            console.log(g.prototype.constructor)
            console.log(h)

            //这是一个特例，它的原型对象是个函数。
            var newfun = new Function();
            console.log(typeof Function.prototype)



            console.log(Object.prototype.__proto__)
        }

    },
    mounted() {
       
    }

})
