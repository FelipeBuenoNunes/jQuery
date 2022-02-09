$(document).ready(() => {
    $.ajax({ url: "https://economia.awesomeapi.com.br/json/all", context: $('select') })
        .done(function (data) {
            for (let coins in data) $(this).append(`<option value="${coins}">${coins}</option>`);
        });

    $('select').change(getCoin);
    $('#requisition').click(getAjax);

    function getCoin() {
        $.ajax({ url: `https://economia.awesomeapi.com.br/json/last/${$('select').val()}-BRL`, context: $('table:first-child') })
            .done(function (data) {
                $(this).html('');
                $(this).append('<thead><tr></tr></thead>');
                $(this).append('<tbody><tr></tr></tbody>');
                Object.entries(Object.values(data)[0]).filter(elem => /code(?!in)|low|high|bid|ask|create_date/.test(elem[0])).forEach((elem, id) => {
                    $('table:first-child > thead > tr').append(`<th>${["Moeda", "Maxima", "Mínima" , "Preço de compra", "Preço de venda", "Data"][id]}</th>`);
                    $('table:first-child > tbody > tr').append(`<td>${elem[1]}</td>`);
                });
            });
    }
    function getAjax() {
        const startDate = $('#start-date').val().replaceAll('-', '');
        const endDate = $('#end-date').val().replaceAll('-', '');
        if (!endDate || !startDate) return;

        $.ajax({ url: `https://economia.awesomeapi.com.br/${$('select').val()}/${10 ** 20}?start_date=${startDate}&end_date=${endDate}`, context: $('table:last-child') })
        .done(function (data) {
            $(this).html('');
            $(this).append('<thead><tr></tr></thead>');
            $(this).append('<tbody></tbody>');
                ["Moeda", "Preço de venda", "Preço de compra", "Maxima", "Mínima", "Variação", "Data"].forEach(elem => $('table:last-child > thead > tr').append(`<th>${elem}</th>`));
                const dates = Object.values(data).map(elem => {
                    const newDate = new Date(elem.timestamp * 1000);
                    elem.timestamp = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
                    return elem;
                }).reduce((acc, item) => {
                    if (acc.length > 0 && acc[acc.length - 1].timestamp === item.timestamp) return acc;
                    acc.push(item);
                    return acc;
                }, []).map(elem => [data[0].code, elem.ask, elem.bid, elem.high, elem.low, elem.pctChange, elem.timestamp]).reverse();

                for(let item of dates){
                    $('table:last-child > tbody').append('<tr></tr>');
                    item.forEach(element => $('table:last-child > tbody > tr:last-child').append(`<td>${element}</td>`));
                }
            });
    }
});