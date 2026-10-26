$(document).ready(function () {

    $('nav a, .hero .button').on('click', function (event) {
        var tujuan = $(this).attr('href');

        if (tujuan && tujuan.startsWith('#')) {
            var bagian = $(tujuan);

            if (bagian.length) {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: bagian.offset().top - 70
                }, 600);
            }
        }
    });

    $('.tab-btn').on('click', function () {
        var kategori = $(this).data('kategori');

        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        $('.product-card').each(function () {
            var kartu = $(this);

            if (
                kategori === 'semua' ||
                kartu.data('kategori') === kategori
            ) {
                kartu.stop(true, true).fadeIn(400);
            } else {
                kartu.stop(true, true).fadeOut(400);
            }
        });
    });

    $('.product-card').hover(
        function () {
            $(this).stop().animate({
                opacity: 0.8
            }, 200);
        },
        function () {
            $(this).stop().animate({
                opacity: 1
            }, 200);
        }
    );

    $('.order-btn').on('click', function () {
        var produk = $(this).data('produk');

        $('#produk-pilihan').val(produk);

        $('html, body').animate({
            scrollTop: $('#pesan').offset().top - 70
        }, 600);
    });

    $('#form-pesanan').validate({
        rules: {
            nama: {
                required: true,
                minlength: 3
            },
            email: {
                required: true,
                email: true
            },
            telepon: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 12
            },
            produk: {
                required: true
            },
            jumlah: {
                required: true,
                digits: true,
                min: 1
            }
        },

        messages: {
            nama: {
                required: 'Nama wajib diisi.',
                minlength: 'Nama minimal 3 karakter.'
            },
            email: {
                required: 'Email wajib diisi.',
                email: 'Masukkan alamat email yang valid.'
            },
            telepon: {
                required: 'Nomor telepon wajib diisi.',
                digits: 'Nomor telepon harus berupa angka.',
                minlength: 'Nomor telepon minimal 10 angka.',
                maxlength: 'Nomor telepon maksimal 12 angka.'
            },
            produk: {
                required: 'Silakan pilih buket bunga.'
            },
            jumlah: {
                required: 'Jumlah buket wajib diisi.',
                digits: 'Jumlah harus berupa angka.',
                min: 'Jumlah buket minimal 1.'
            }
        },

        submitHandler: function (form) {
            var nama = $('<div>').text($('#nama').val()).html();
            var produk = $('<div>').text($('#produk-pilihan').val()).html();
            var jumlah = $('<div>').text($('#jumlah').val()).html();

            $('#hasil-pesanan')
                .html(
                    '<strong>Pesanan berhasil dibuat!</strong><br>' +
                    'Nama: ' + nama + '<br>' +
                    'Buket: ' + produk + '<br>' +
                    'Jumlah: ' + jumlah
                )
                .stop(true, true)
                .hide()
                .fadeIn(500);

            return false;
        }
    });

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 300) {
            $('#kembali-atas').stop(true, true).fadeIn(200);
        } else {
            $('#kembali-atas').stop(true, true).fadeOut(200);
        }
    });

    $('#kembali-atas').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 600);
    });

});