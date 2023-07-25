function showAddModal() {
    $('#modal_addSchool').modal('show');
}

function showDetailModal() {
    $('#modal_detailSchool').modal('show');
}

function showDeleteModal() {
    $('#modal_deleteSchool').modal('show');
}
function hideDeleteModal() {
    $('#modal_deleteSchool').modal('hide');
}

$('.modal').on('shown.bs.modal', function () {
    $(this).find('[autofocus]')?.focus();
});

function initTable() {
    table = $("#schoolAddTable").on('preXhr.dt', function (e, settings, data) { }).on('draw.dt', function () { console.log("table draw!") })
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

                })
                table.draw(false)
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

$('#tbody').on('click', '.item_detail', function () {
    var sid = $(this).attr('data');
    $.ajax({
        type: "GET",
        url: "/api/sekolah/" + sid,
        dataType: "JSON",
        data: { id: sid },
        success: function (data) {
            console.log(data);
            $.each(data, function () {
                showDetailModal();
                $('[data-name="nama_sekolah"]').text(data[0].nama_sekolah);
                $('[data-name="alamat"]').text(data[0].alamat);
            });
        }
    });
    return false;
});

$('#tbody').on('click', '.item_hapus', function () {
    var sid = $(this).attr('data');
    showDeleteModal();
    $('[name="deleteId"]').val(sid);
});

$('#btn_hapus').on('click', function () {
    var sid = $('#deleteId').val();
    $.ajax({
        type: "DELETE",
        url: "/api/delete-sekolah",
        dataType: "JSON",
        data: { "id": parseInt(sid) },
        success: function (data) {
            if (data) {
                hideDeleteModal();
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
                    Swal.fire(
                        {
                            icon: 'success',
                            title: 'Berhasil',
                            text: 'Data telah dihapus.',
                        }
                    )
                })
                table.draw(false)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ada yang eror!',
                })
            }
        }
    });
    return false;
});