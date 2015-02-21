var dumper = (function () {
    var socket, sessionUid, socketUri, init;

    init = function () {
        if (typeof(io) === 'undefined') {
            setTimeout(init, 100);
        } else {
            socket = io(socketUri);

            socket.on('dumper.' + sessionUid, function (data) {
                console.group('Dumper:', data.title);
                switch (data.title) {
                    case 'emergency':
                    case 'alert':
                    case 'critical':
                    case 'error':
                        console.error(data.data);
                        break;
                    case 'warning':
                        console.warn(data.data);
                        break;
                    case 'notice':
                    case 'info':
                    //case 'debug':
                        console.info(data.data);
                        break;
                    default:
                        console.log(data.data);
                }
                console.groupEnd();
            });
        }
    };

    return {
        startSocketIo: function (uid, uri) {
            var script = document.createElement('script');
            var node = document.getElementsByTagName('script')[0];

            sessionUid = uid;
            socketUri = uri;
            script.src = socketUri + '/socket.io/socket.io.js';
            node.parentNode.insertBefore(script, node);

            init();
        }
    };
})();