
$(document).ready(function () {
    document.getElementById("aiosc-department").value = 3;
    document.getElementById("t_prodotto").value = 'finestre';
    document.getElementById("t_componente").value = localStorage.getItem("componente");
    document.getElementById("aiosc-priority").value = localStorage.getItem("priorita");
    document.getElementById("aiosc-subject").value = localStorage.getItem("oggetto");
    document.getElementById("tinymce").getElementsByTagName(p)[0].html = localStorage.getItem("note");

    alert('Simulazione: apertura ticket');
    
    $("#aiosc-department").val(3);
    $("#t_prodotto").val('finestre');
    $("#t_componente").val();
});
