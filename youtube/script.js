$(function () {
    (() => {
        for (let i = 0; i < 5; i++) {
            $('section').append(`<div id="tabs-${i + 1}"></div>`);
            $('section > div:last-child').append(`<div id="video${i + 1}"></div>`);
            $('section > div:last-child').append('<div class="accordion"></div>');
            $('section > div:last-child > div:last-child').append('<h3>Autor</h3>')
                .append(`<div id="author${i + 1}"></div>`)
                .append('<h3>Título</h3>')
                .append(`<div id="title${i + 1}"></div>`)
                .append('<h3>Duração</h3>')
                .append(`<div id="duration${i + 1}"></div>`)
                .append(`<h3>ID Video</h3>`)
                .append(`<div id="id_video${i + 1}"></div>`)
        }
    })();


    $("#tabs").tabs({ collapsible: true });

    $(".accordion").accordion({ collapsible: true, active: false });

    $('a[href^="#tabs"]').on('click', newVideo)
});
const idsVideos = ["6FW3L-NePUI", "g6M8oJq-dEA", "vXFXwA8V7Ic", "G9z8grRBupQ", "fD72GGfc-HI"]
let player;
function newVideo(e) {
    if (player) player.destroy();
    const id = e.target.href[e.target.href.length - 1];

    player = new YT.Player(`video${id}`, {
        height: '360',
        width: '640',
        videoId: idsVideos[id-1],
        events: {
            'onReady': onPlayerReady
        }
    });
}


function onPlayerReady(event) {
    player.playVideo();
    
    const interval = setInterval(() =>{
        if(player.getCurrentTime() != 0){
            const id = event.target.h.id[5];
            const metas = player.getVideoData();
            console.log(metas);
            $(`#author${id}`).text(metas.author);
            $(`#title${id}`).text(metas.title);
            $(`#duration${id}`).text(player.getDuration() + ' Segundos');
            $(`#id_video${id}`).text(metas.video_id);
            clearInterval(interval);
        }
    }, 500);
}