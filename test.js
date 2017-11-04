
console.log(Test());

function Test() {
    let date = new Date();
    let str = '20'+date.getYear().toString().substring(1,3)+(date.getMonth()+1).toString()+date.getDate();
    return(str);
}