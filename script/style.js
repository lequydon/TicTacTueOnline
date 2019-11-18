$(document).ready(function(){
    function settingRealTime(){
        var firebaseConfig = {
            apiKey: "AIzaSyAvxqTaSrWlqkJdLxXvcNIsbj1SdwIG6kM",
            authDomain: "extreme-wind-257902.firebaseapp.com",
            databaseURL: "https://extreme-wind-257902.firebaseio.com",
            projectId: "extreme-wind-257902",
            storageBucket: "extreme-wind-257902.appspot.com",
            messagingSenderId: "820824175079",
            appId: "1:820824175079:web:1a9d832db12b7e0d288d42",
            measurementId: "G-75S9MD5P25"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
          firebase.analytics();
          //console.log(firebase.SDK_VERSION)
    }
    function removeDatabaseRealTime(){
        var database=firebase.database();
        var chess= database.ref('chess');
        chess.set({
            chess:null,
            idLocation:null
          })
    }
    function pushDatabaseRealTime(chessType,id){
        var database=firebase.database();
        var chess= database.ref('chess');
        chess.push({
            chess:chessType,
            idLocation:id
          })
    }
    function pushEventDatabaseRealTime(){
        var database=firebase.database();
        var chess= database.ref('chess');
        chess.on('child_added',function(snapshot){
            if(checkPlayer=="")
                checkPlayer="X";
            var dataObj=JSON.parse(JSON.stringify(snapshot.val()));
            $('#'+dataObj.idLocation).trigger('click');
          })
    }
    function createChessO(id){
        $('#'+id+'').append('<img class="content__chess" name="chessO" src="image/o.png">');
    }
    function createChessX(id){
        $('#'+id+'').append('<img class="content__chess" name="chessX" src="image/x.png">');
    }
    function checkEqual(id,idNext,idNextTwo){
        if($('#'+id+'').children().attr("name")==$('#'+idNext+'').children().attr("name")&&$('#'+id+'').children().attr("name")==$('#'+idNextTwo+'').children().attr("name"))
        {
            if($('#'+id+'').children().attr("name")=="chessO")
                {
                    flagCheckWin=1;
                    numberChess=-1;
                    swal("Player1 win!");
                    $('#pointO').text(parseInt($('#pointO').text())+1);
                    setTimeout(function(){
                        $('.content__box').empty();
                    }, 500);
                    removeDatabaseRealTime();
                }
            if($('#'+id+'').children().attr("name")=="chessX")
                {
                    flagCheckWin=1;
                    numberChess=-1;
                    swal("player2 win!");
                    $('#pointX').text(parseInt($('#pointX').text())+1);
                    setTimeout(function(){
                        $('.content__box').empty();
                    }, 500);
                    removeDatabaseRealTime();
                }
        }
    }
    function checkChessEqualColumn(id){
        if(id!=1)
            id=1+(id-1)*3;
        var idNext=id+1;
        var idNextTwo=id+2;
        checkEqual(id,idNext,idNextTwo);
            
    }
    function checkChessEqualRow(id){
        var idNext=id+3;
        var idNextTwo=id+6;
        checkEqual(id,idNext,idNextTwo);
    }
    function checkChessCrossRight(){
        var id=1;
        var idNext=5;
        var idNextTwo=9;
        checkEqual(id,idNext,idNextTwo);
    }
    function checkChessCrossLeft(){
        var id=3;
        var idNext=5;
        var idNextTwo=7;
        checkEqual(id,idNext,idNextTwo);
    }
    function checkWin(){
        for(var i=1;i<=3;i++){
            checkChessEqualColumn(i);
            checkChessEqualRow(i);
            checkChessCrossRight();
            checkChessCrossLeft();
        }
    }
    function resetGame(){
        $('.content__resetGame div').click(function(){
            removeDatabaseRealTime();
            $('.content__box').empty();
            $('.content--point').text(0);
        })
    }
    var numberChess=0;
    var flagCheckWin=0;
    var checkPlayer="";
    function runGame(){
        var player=0;
        //event click each box
        $('.content__box').click(function(){
            if($(this).children().length==0)
            { 
                if(checkPlayer=="")
                    checkPlayer="O";
                    if(player==0)
                    {
                        createChessO($(this).attr("id"));
                        pushDatabaseRealTime("O",$(this).attr("id"));
                        player=1;
                    }
                    else
                    {
                        createChessX($(this).attr("id"));
                        pushDatabaseRealTime("X",$(this).attr("id"));
                        player=0;
                    }
                checkWin();
                // console.log(flagCheckWin);
                // console.log("count",numberChess);
                if(numberChess==8&&flagCheckWin==0)
                {
                    numberChess=0;
                    swal("Equal!");
                    $('.content__box').empty();
                    removeDatabaseRealTime();
                }
                else
                    numberChess++;
                flagCheckWin=0;
            }
        })
        resetGame();
    }
    settingRealTime();
    pushEventDatabaseRealTime();
    runGame();
})