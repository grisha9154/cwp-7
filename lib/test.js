function getArticles() {
    doPost();
}
function doPost() {
  //  createButton();
    $.post('./api/articles/readall',{},parseData);
}
function parseData(data){
    for(let i=0;i<data.meta.limit;i++){
      createArticle(data.items[i]);
    }

 }
function createArticle(data) {
    createArticleForm(data.id);
    createArticleTitle(data.id,data.title);
    createArticleBody(data);
    createArticleComment(data.id,data.comments);

 }
function createArticleForm(id) {
     $("#articles").append("<div id = article"+id+"></div><br/>");
 }
function createArticleTitle(id,title) {
     $("#article"+id).append("<div class = title>"+title+"</div>");
}
function createArticleBody(data) {
     $("#article"+data.id).append("<div id=artBody"+data.id+" class = body></div>");
    createArticleText(data.id,data.text);
    createArticleFoot(data);
 }
function createArticleText(id, text) {
     $("#artBody"+id).append("<div class = text>"+text+"</div>");
 }
function createArticleFoot(data) {
    $("#artBody"+data.id).append("<div id=artBodyFoot"+data.id+" class = foot></div>");
    createArticleAuthor(data.id,data.author);
    createArticleTime(data.id, data.date);
 }
function createArticleAuthor(id, author) {
    $("#artBodyFoot"+id).append("<div class = author>"+author+"</div>");
}
function createArticleTime(id, time) {
    $("#artBodyFoot"+id).append("<div class = time>"+getTime(time)+"</div>");
}
function createArticleComment(id, comments) {

     if(comments.length>0)
     for(let i =0;i<comments.length;i++){
         $("#article"+id).append("<div id=articleComment"+id+" class = comment></div>");
         createCommentBody(comments[i]);
         createCommentFoot(comments[i]);
     }
}
function createCommentBody(comments) {
    $("#articleComment"+comments.articleId).append("<div id=artCommentBody"+comments.id+" class = ComBody></div>");

    createCommentText(comments);
}
function createCommentText(comments) {
    $("#artCommentBody"+comments.id).append("<div class = text>"+comments.text+"</div>")
}
function createCommentFoot(comments) {
    $("#articleComment"+comments.articleId).append("<div id=artCommentFoot"+comments.id +" class = foot></div>");
    createCommentAuthor(comments.id,comments.author);
    createCommentTime(comments.id,comments.date);
}
function createCommentAuthor(id, author) {
    $("#artCommentFoot"+id).append("<div class = author>"+author+"</div>");
}
function createCommentTime(id, time) {
    $("#artCommentFoot"+id).append("<div class = time>"+getTime(time)+"</div>");
}
function getTime(time) {
    let str=time.toString().substring(6,8);
    str+='.';
    str+=time.toString().substring(4,6);
    str+='.';
    str+=time.toString().substring(0,4);
    return str;
}
function createButton() {
    $("body").append("<p><input type=\"button\" id=\"button1\" value=\"Отправить\"></p><button id=\"button0\">Добавить</button>");
    return "<p><input type=\"button\" id=\"button1\" value=\"Отправить\"></p><button id=\"button0\">Добавить</button>";
}

function retAllAry(data) {
    let str = "";
    for(let i=0;i<data.items.length;i++){
        str+=retArtForm(data.items[i]);
    }
   // str+=createButton()
    return str;
}
function retArtForm(data) {
    return "<div id = article"+data.id+">"+retArtTitle(data)+retArtBody(data)+retArtCom(data)+"</div><br/>";
}
function retArtTitle(data) {
    return "<div class = title>"+data.title+"</div>"
}
function retArtBody(data) {
    return "<div id=artBody"+data.id+" class = body>"+retArtText(data)+retArtFoot(data)+"</div>"
}
function retArtText(data) {
    return "<div class = text>"+data.text+"</div>"
}
function retArtFoot(data) {
    return "<div id=artBodyFoot"+data.id+" class = foot>"+retArtAuthor(data)+retArtDate(data)+"</div>";
}
function retArtAuthor(data) {
    return "<div class = author>"+data.author+"</div>"
}
function retArtDate(data) {
    return "<div class = time>"+getTime(data.date)+"</div>";
}
function retArtCom(data) {
    if(data.comments.length>0){
        return "<div id=articleComment"+data.id+" class = comment>"+getAllComment(data)+"</div>";
    }
    return "";
}
function getAllComment(data) {
    let str ="";
    for(let i=0;i<data.comments.length;i++){
        str +="<div id=artCommentBody"+data.comments[i].id+" class = ComBody>"+getComText(data.comments[i])+getComFoot(data.comments[i])+"</div>"
    }
    return str;
}
function getComText(com) {
    return "<div class = text>"+com.text+"</div>";
}
function getComFoot(com) {
    return "<div id=artCommentFoot"+com.id +" class = foot>"+getComAuthor(com)+getComDate(com)+"</div>"
}
function getComAuthor(com) {
    return "<div class = author>"+com.author+"</div>"
}
function getComDate(com) {
    return "<div class = time>"+getTime(com.date.toString())+"</div>"
}

function ActionEvent() {
    let value = {
        sortField:$("#select0").serialize().toString().substring(10),
        sortOrder:$("#select1").serialize().toString().substring(10)
    };
    $.post('./api/articles/readall',JSON.stringify(value),(data)=>{
        $("#articles").html(retAllAry(data));
    });
}

$("#button0").bind('click',function () {
        document.location.href("./form.html");
});