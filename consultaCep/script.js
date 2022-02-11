$(document).ready(function() {
    $('input[type = button]').eq(0).click(getCep)
});

function getCep(){
    if($('#cep').val() === '') return;
    $.ajax({ url: `https://cep.awesomeapi.com.br/${$('#cep').val()}`, context: $('body > div > p') })
    .done(function(data) {
        const resposta = `${data.address}, ${data.district}, ${data.city} - ${data.state}`
        if($(this).length === 0) $('body > div').append(`<p>${resposta}</p>`);
        else $(this).text(resposta);
        getMaps(data.cep);
    })
    .fail(data => {
        if(data.status === 400) alert('CEP invalido')
        else alert('CEP não encontrado');
    })
    .always(() => $('#cep').val('') );
}

function getMaps(cep){
    $("body > section").html('');
    $("body > section").append(`<iframe width="800" height="550" style="border:0" loading="lazy" allowfullscreen src="https://maps.google.com/maps?q=${cep}&t=&z=13&ie=UTF8&iwloc=&output=embed">
    </iframe>`);
}