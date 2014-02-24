$(function() {
    var rainbowColors = [
        '#FF0000',
        '#f26522',
        '#fff200',
        '#00a651',
        '#28abe2',
        '#2e3192',
        '#6868ff'
    ];
    var rainbowOptions = {
        colors: rainbowColors,
        animate: true,
        animateInterval: 100,
        pad: false,
        pauseLength: 100
    };
    var recentMsg;

    var nickname = '';
    var nameColor = '#f00';

    var chatInput = $('#chat-input');
    var chatBox = $('#chat-box');
    var chatCount = $('#chatter-count');
    var nameColorInput = $('#name-color');
    var nicknameInput = $('#name-input');

    nameColorInput.spectrum({
        color: '#f00',
        className: 'color-input',
        clickoutFiresChange: true,
        change: function(color) {
            nameColor = color.toHexString();
        }
    });

    nicknameInput.keyup(function(event) {
        nickname = nicknameInput.val();
    });

    var socket = io.connect('http://localhost');

    socket.on('message', function(data) {
        addMessage(data);
    });

    socket.on('connCount', function(num) {
        chatCount.html(num);
    });

    socket.on('recentMsgs', function(msgs) {
        for (var i=0; i<msgs.length; i++) {
            var m = msgs[i];
            addMessage(m);
        }
    });

    function chooseRand(arr) {
        index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    function addMessage(msg) {
        cleanPrevMessages();
        var msgEl = getMsgEl(msg, true);
        recentMsg = msg;
        chatBox.append(msgEl);
    }

    function getMsgEl(msg, rainbow) {
        var msgEl = $('<div>');
        msgEl.addClass('chat-msg');
        msgEl.html(msg.text);

        var senderEl = $('<span>');
        senderEl.addClass('chat-nickname');
        senderEl.css('color', msg.color);
        senderEl.html(msg.sender);
        msgEl.prepend(senderEl);

        var timeEl = $('<span>');
        timeEl.addClass('chat-msg-time');
        timeEl.html(msg.when);

        if (rainbow)  {
            timeEl.rainbow(rainbowOptions);
        }
        else {
            timeEl.css('color', chooseRand(rainbowColors));
        }

        msgEl.prepend(timeEl);
        return msgEl;
    }

    function cleanPrevMessages() {
        if (recentMsg) {
            clearInterval(rainbowOptions.interval);
            chatBox.children().last().remove();
            var msgEl = getMsgEl(recentMsg, false);
            chatBox.append(msgEl);
        }
    }

    function sendChat() {
        if (!chatInput.val())
            return;

        if (!nickname) {
            nickname = 'mystery_lady';
            nicknameInput.val(nickname);
        }

        var time = new Date();
        var minutes = time.getMinutes() + '';
        if (minutes.length < 2)
            minutes = '0' + minutes;
        var whenStr = time.getHours() + ':' + minutes;
        var msg = {
            sender: nickname,
            color: nameColor,
            text: chatInput.val(),
            when: whenStr
        };
        socket.emit('message', msg);

        chatInput.val('');
        chatBox.scrollTop(chatBox[0].scrollHeight);
    }
    $('#chat-send').click(function() {
        sendChat();
    });
    $('#chat-input').keyup(function(event) {
        if (event.keyCode == 13) { // enter key
            sendChat();
        }
    });
});