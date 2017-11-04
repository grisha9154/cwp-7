
function SendArticle() {
    let value = {title:GetTitle(),text:GetBody(),author:GetAuthor(),date:GetDate(),comments:[]};
    $.post('./api/articles/create',JSON.stringify(value),function () {
        alert("eee");
    });
}

function GetTitle() {
    let str = $("#Title").text();
    return str;
}
function GetBody() {
    let str = $("#Body").text();
    return str;
}
function GetAuthor() {
    let str = $("#Author").text();
    return str;
}
function GetDate() {
    let date = new Date();
    let str = '20'+date.getYear().toString().substring(1,3)+(date.getMonth()+1).toString()+date.getDate();
    return(str);
}

$('button').bind('click',function () {
   SendArticle();
});

