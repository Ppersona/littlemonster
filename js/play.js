$(function(){
    // alphabet array
    var alphabet_array = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
    ];
    
    // word array
    var word_array = {
        "a": "apple",
        "b": "bird",
        "c": "cat",
        "d": "dog",
        "e": "egg",
        "f": "fish",
        "g": "girl",
        "h": "hen",
        "i": "ice",
        "j": "jar",
        "k": "key",
        "l": "lock",
        "m": "moon",
        "n": "nest",
        "o": "owl",
        "p": "pen",
        "q": "queen",
        "r": "rain",
        "s": "sock",
        "t": "tiger",
        "u": "umbrella",
        "v": "van",
        "w": "watermelon",
        "x": "x-ray",
        "y": "yam",
        "z": "zebra"
    };
    
    // question array (store random 5 words)
    var question_array = [];
    
    // alphabet_random (store random 5 alphabet)
    var alphabet_random = [];
    
    /* shuffle alphabet
    * @param array arr
    */
    function shuffleAlphabet(arr){
        for(var i = arr.length - 1; i > 0; i--){
            var r = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[r];
            arr[r] = tmp;
        }
        return arr;
    }
    
    /* start game (set all alphabet images)
    * @param array arr
    * @param int play_count
    */
    var play_count = 0; // count up when word is corrected
    var word_count = 0;
    var word_num = 0;
    var check_word = [];
    var word_split;
    function playGame(arr,play_count){
        //console.log(play_count);
        /* reset */
        word_count = 0;
        $('#drop_area').html('');
        $('#drag_area').html('');
        $('#overley').hide();
        /* reset */
        
        $('#word_image').html('<img src="img/A-Z/'+ word_array[arr[play_count]] +'.png" alt="'+ word_array[arr[play_count]] +'">');
        word_split = word_array[arr[play_count]].split('');
        word_num = word_split.length;
        for(var i = 0; i < word_split.length; i++){
            $('#drop_area').append('<div class="drop '+ word_split[i] +' drop'+ i +'"><img src="img/frame.png"></div>');
            var flg = true;
            $('#drop_area .drop' + i).droppable({
                accept: '.alphabet_' + word_split[i],
                tolerance: 'touch',
                activeClass: 'active',
                hoverClass: 'hover',
                activate: function(e, ui) {
                    flg = true;
                },
                drop: function(e, ui) {
                    var alpha_check = false;
                    var obj = ui.draggable.attr('class').split(" ");
//                    if(word_count == 0){
//                        check_word[0] = obj[1];
//                        word_count++;
//                    }else{
//                        for(var i = 0; i < check_word.length; i++){
//                            //console.log('aaa');
//                            if(check_word[i] == obj[1]){
//                                alpha_check = true;
//                                break;
//                            }
//                        }
//                        if(!alpha_check){
//                            ui.draggable.draggable({disabled: true});
//                            check_word[word_count] = obj[1];
//                            word_count++;
//                        }
//                    }
                    
                    ui.draggable.draggable({disabled: true});
                    check_word[word_count] = obj[1];
                    word_count++;
                    
                    //console.log(word_count);
                    if(word_count == word_num){
                        $('#star').append('<li><img src="img/star.png"></li>');
                        if(play_count == 4){
                            $('#menu').html('<li><a href="/"><img src="img/menu.png"></a></li>');
                        }else{
                            $('#menu').html('<li><a href="/"><img src="img/menu.png"></a></li><li><a href="#" onclick="nextGame();"><img src="img/next.png"></a></li>');
                        }
                        $('#overley').show();
                    }
                    flg = false;
                },
                deactivate: function(e, ui) {
                    ui.draggable.draggable({revert: flg});
                }
            });
        }
        
        // shuffle alphabet
        var alphabet = shuffleAlphabet(word_split);
        console.log(alphabet);
        console.log(word_split);
        for(var i = 0; i < alphabet.length; i++){
            $('#drag_area').append('<div class="drag alphabet_'+ alphabet[i] + ' drag'+ i +'"><img src="img/'+ alphabet[i] +'.png"></div>');
        }
        
        $('#drag_area .drag').draggable({
            containment: '.right_side',
            revert: true,
            snap:'.drop',
            snapMode: 'inner',
            drag: function() {
                $(this).addClass('dragout');
            },
            stop: function() {
                $(this).removeClass('dragout');
            }
        });
        
        //play_count++;
        
    }
    
    // show card image
    window.nextGame = function (){
        //console.log(play_count);
        play_count++;
        playGame(alphabet_random,play_count);
        return false;
    }
    
    // choose 5 alphabet randomly
    var check = 0;
    var count = 0;
    var random_num; // random number  
    while(count < 5){
        check = 0;
        random_num = Math.round( Math.random()*25);
        //console.log(random_num);
        for(var j = 0; j < alphabet_random.length; j++){
            if(alphabet_array[random_num] == alphabet_random[j]){
                check = 1;
            }
        }
        if(check == 0){
            alphabet_random[count] = alphabet_array[random_num];
            count++;
            //console.log(alphabet_random);
        }
        if(count == 5){
            playGame(alphabet_random,play_count);
        }
    }
    
});