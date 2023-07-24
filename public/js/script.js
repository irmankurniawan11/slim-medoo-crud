function showAddModal() {
    $('#modal_addSchool').modal('show');
}

$('.modal').on('shown.bs.modal', function () {
    $(this).find('[autofocus]').focus();
});

function initTable() {
    $("#schoolAddTable").on('preXhr.dt', function (e, settings, data) { }).on('draw.dt', function () { })
        .DataTable({
            "columnDefs": [
                { "width": "5%", "targets": 0, className: "text-start", "orderable": false },
                { "width": "40%", "targets": 1, className: "text-start", "orderable": false },
                { "width": "40%", "targets": 2, className: "text-start", "orderable": false },
                { "width": "15%", "targets": 3, className: "text-start", "orderable": false },
            ],
            'pageLength': 10,
            'processing': true,
            'serverSide': true,
            'serverMethod': 'get',
            'ajax': {
                'url': "/api/sekolah",
                'dataType:': 'json',
                'type': 'get',
            },
            'columns': [
                { 'data': 'no' },
                { 'data': 'nama_sekolah' },
                { 'data': 'alamat' },
                { 'data': 'action' },
            ]
        });

}

initTable();

$('#addSchoolButton').on('click', function () {
    var schoolName = $('#nama_sekolah').val();
    var schoolAddress = $('#alamat').val();
    $.ajax({
        type: "POST",
        url: "/add-sekolah",
        dataType: "JSON",
        data: { nama_sekolah: schoolName, alamat: schoolAddress },
        success: function (data) {
            if (data) {
                let timerInterval
                Swal.fire({
                    title: 'Memuat Data...',
                    html: 'Tunggu  <b></b>  Detik.',
                    timer: 300,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }

                }).then((result) => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'Data telah ditambahkan.'
                    })
                    $('#modal_addSchool').on('hidden.bs.modal', function () {
                        $(this).find('form')[0].reset();
                    });

                    table.draw(false)
                })

                $('#modal_addSchool').modal('hide');

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ada yang eror!'
                })
            }

        }
    });
    return false;
})