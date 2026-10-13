
$(document).ready(function () {
    const produk = [
        {
            id: 1,
            nama: "Facial Wash",
            kategori: "skincare",
            harga: 35000,
            deskripsi: "Pembersih wajah untuk perawatan sehari-hari.",
            ikon: "fa-pump-soap",
            badge: "Terlaris"
        },
        {
            id: 2,
            nama: "Moisturizer",
            kategori: "skincare",
            harga: 55000,
            deskripsi: "Pelembap untuk membantu menjaga kelembapan kulit.",
            ikon: "fa-droplet",
            badge: "Favorit"
        },
        {
            id: 3,
            nama: "Sunscreen",
            kategori: "skincare",
            harga: 65000,
            deskripsi: "Pelindung kulit dari paparan sinar matahari.",
            ikon: "fa-sun",
            badge: "Terlaris"
        },
        {
            id: 4,
            nama: "Serum Wajah",
            kategori: "skincare",
            harga: 75000,
            deskripsi: "Serum untuk melengkapi rutinitas perawatan kulit.",
            ikon: "fa-flask",
            badge: "Populer"
        },
        {
            id: 5,
            nama: "Toner Wajah",
            kategori: "skincare",
            harga: 42000,
            deskripsi: "Toner untuk melengkapi perawatan setelah mencuci wajah.",
            ikon: "fa-flask",
            badge: ""
        },
        {
            id: 6,
            nama: "Micellar Water",
            kategori: "skincare",
            harga: 38000,
            deskripsi: "Pembersih untuk membantu mengangkat sisa makeup.",
            ikon: "fa-water",
            badge: ""
        },
        {
            id: 7,
            nama: "Lipstik",
            kategori: "kosmetik",
            harga: 45000,
            deskripsi: "Lipstik untuk melengkapi tampilan sehari-hari.",
            ikon: "fa-wand-magic-sparkles",
            badge: "Favorit"
        },
        {
            id: 8,
            nama: "Bedak Compact",
            kategori: "kosmetik",
            harga: 50000,
            deskripsi: "Bedak praktis untuk merapikan tampilan makeup.",
            ikon: "fa-circle",
            badge: ""
        },
        {
            id: 9,
            nama: "Foundation",
            kategori: "kosmetik",
            harga: 85000,
            deskripsi: "Foundation untuk membantu meratakan tampilan warna kulit.",
            ikon: "fa-palette",
            badge: "Populer"
        },
        {
            id: 10,
            nama: "Blush On",
            kategori: "kosmetik",
            harga: 40000,
            deskripsi: "Perona pipi untuk memberikan warna pada wajah.",
            ikon: "fa-heart",
            badge: ""
        },
        {
            id: 11,
            nama: "Maskara",
            kategori: "kosmetik",
            harga: 48000,
            deskripsi: "Maskara untuk mempertegas tampilan bulu mata.",
            ikon: "fa-eye",
            badge: ""
        },
        {
            id: 12,
            nama: "Lip Tint",
            kategori: "kosmetik",
            harga: 32000,
            deskripsi: "Pewarna bibir praktis untuk penggunaan sehari-hari.",
            ikon: "fa-kiss-wink-heart",
            badge: "Terlaris"
        }
    ];

    let keranjang = [];
    let kategoriAktif = "all";
    let kataKunci = "";
    let toastTimer;

    function formatRupiah(angka) {
        return "Rp " + angka.toLocaleString("id-ID");
    }

    function tampilkanToast(pesan) {
        clearTimeout(toastTimer);

        $("#toastMsg").text(pesan);
        $("#toast").addClass("show");

        toastTimer = setTimeout(function () {
            $("#toast").removeClass("show");
        }, 2500);
    }

    function tampilkanProduk() {
        const hasil = produk.filter(function (item) {
            const cocokKategori =
                kategoriAktif === "all" ||
                item.kategori === kategoriAktif;

            const teks = (
                item.nama + " " + item.deskripsi
            ).toLowerCase();

            const cocokPencarian =
                teks.includes(kataKunci.toLowerCase());

            return cocokKategori && cocokPencarian;
        });

        $("#produkGrid").empty();

        if (hasil.length === 0) {
            $("#produkGrid").html(
                '<p class="produk-kosong">Produk tidak ditemukan.</p>'
            );
            return;
        }

        hasil.forEach(function (item) {
            const badge = item.badge
                ? `<span class="produk-badge">${item.badge}</span>`
                : "";

            const kartu = `
                <div class="produk-card">
                    ${badge}

                    <div class="produk-img">
                        <i class="fas ${item.ikon}"></i>
                    </div>

                    <div class="produk-info">
                        <h3>${item.nama}</h3>
                        <p class="desc">${item.deskripsi}</p>

                        <div class="produk-footer">
                            <div class="produk-price">
                                ${formatRupiah(item.harga)}
                                <small>${item.kategori}</small>
                            </div>

                            <button class="btn-add-cart"
                                data-id="${item.id}"
                                aria-label="Tambah ${item.nama} ke keranjang">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            $("#produkGrid").append(kartu);
        });
    }

    function aturKategori(kategori) {
        kategoriAktif = kategori;

        $(".filter-btn").removeClass("active");
        $('.filter-btn[data-cat="' + kategori + '"]')
            .addClass("active");

        $(".nav-link").removeClass("active");
        $('.nav-link[data-filter="' + kategori + '"]')
            .addClass("active");

        tampilkanProduk();
    }

    function tambahKeKeranjang(id) {
        const itemProduk = produk.find(function (item) {
            return item.id === id;
        });

        if (!itemProduk) {
            return;
        }

        const itemKeranjang = keranjang.find(function (item) {
            return item.id === id;
        });

        if (itemKeranjang) {
            itemKeranjang.jumlah++;
        } else {
            keranjang.push({
                id: itemProduk.id,
                nama: itemProduk.nama,
                harga: itemProduk.harga,
                ikon: itemProduk.ikon,
                jumlah: 1
            });
        }

        tampilkanKeranjang();
        tampilkanToast(itemProduk.nama + " ditambahkan ke keranjang.");
    }

    function tampilkanKeranjang() {
        $("#cartItems").empty();

        if (keranjang.length === 0) {
            $("#cartItems").html(`
                <div class="cart-empty">
                    <i class="fas fa-shopping-bag"></i>
                    <p>Keranjang masih kosong</p>
                    <span>Silakan pilih produk terlebih dahulu.</span>
                </div>
            `);
        } else {
            keranjang.forEach(function (item) {
                const isi = `
                    <div class="cart-item">
                        <div class="cart-item-icon">
                            <i class="fas ${item.ikon}"></i>
                        </div>

                        <div class="cart-item-info">
                            <h5>${item.nama}</h5>

                            <div class="price">
                                ${formatRupiah(item.harga * item.jumlah)}
                            </div>

                            <div class="qty-control">
                                <button class="qty-btn"
                                    data-id="${item.id}"
                                    data-aksi="kurang"
                                    aria-label="Kurangi jumlah">−</button>

                                <span class="qty-value">${item.jumlah}</span>

                                <button class="qty-btn"
                                    data-id="${item.id}"
                                    data-aksi="tambah"
                                    aria-label="Tambah jumlah">+</button>
                            </div>
                        </div>

                        <button class="cart-item-remove"
                            data-id="${item.id}"
                            aria-label="Hapus ${item.nama}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;

                $("#cartItems").append(isi);
            });
        }

        const jumlahBarang = keranjang.reduce(function (total, item) {
            return total + item.jumlah;
        }, 0);

        const subtotal = keranjang.reduce(function (total, item) {
            return total + item.harga * item.jumlah;
        }, 0);

        let diskon = 0;

        if (subtotal > 100000) {
            diskon = subtotal * 0.10;
        }

        const totalBayar = subtotal - diskon;

        $("#cartBadge").text(jumlahBarang);
        $("#cartSubtotal").text(formatRupiah(subtotal));
        $("#cartDiscount").text("- " + formatRupiah(diskon));
        $("#cartTotal").text(formatRupiah(totalBayar));

        if (diskon > 0) {
            $("#discountRow").show();
        } else {
            $("#discountRow").hide();
        }
    }

    function bukaKeranjang() {
        $("#cartSidebar").addClass("open");
        $("#cartOverlay").stop(true, true).fadeIn(200);
    }

    function tutupKeranjang() {
        $("#cartSidebar").removeClass("open");
        $("#cartOverlay").stop(true, true).fadeOut(200);
    }

    $(".filter-btn").on("click", function () {
        aturKategori($(this).data("cat"));
    });

    $(".nav-link").on("click", function () {
        aturKategori($(this).data("filter"));

        $("#navMenu").removeClass("show");
        $("#hamburger i")
            .removeClass("fa-times")
            .addClass("fa-bars");
    });

    $("#searchProduk").on("input", function () {
        kataKunci = $(this).val();
        tampilkanProduk();
    });

    $("#produkGrid").on("click", ".btn-add-cart", function () {
        const id = Number($(this).data("id"));
        tambahKeKeranjang(id);
    });

    $("#cartItems").on("click", ".qty-btn", function () {
        const id = Number($(this).data("id"));
        const aksi = $(this).data("aksi");

        const item = keranjang.find(function (produk) {
            return produk.id === id;
        });

        if (!item) {
            return;
        }

        if (aksi === "tambah") {
            item.jumlah++;
        } else if (aksi === "kurang") {
            item.jumlah--;

            if (item.jumlah <= 0) {
                keranjang = keranjang.filter(function (produk) {
                    return produk.id !== id;
                });
            }
        }

        tampilkanKeranjang();
    });

    $("#cartItems").on("click", ".cart-item-remove", function () {
        const id = Number($(this).data("id"));

        keranjang = keranjang.filter(function (item) {
            return item.id !== id;
        });

        tampilkanKeranjang();
        tampilkanToast("Produk dihapus dari keranjang.");
    });

    $("#cartBtn").on("click", bukaKeranjang);
    $("#cartClose, #cartOverlay").on("click", tutupKeranjang);

    $("#hamburger").on("click", function () {
        $("#navMenu").toggleClass("show");
        $("#hamburger i").toggleClass("fa-bars fa-times");
    });

    $("#btnCheckout").on("click", function () {
        if (keranjang.length === 0) {
            tampilkanToast("Keranjang masih kosong.");
            return;
        }

        const tombol = $(this);
        const teksAwal = tombol.html();

        tombol.prop("disabled", true);
        tombol.html(
            '<i class="fas fa-spinner fa-spin"></i> Memproses...'
        );

        setTimeout(function () {
            keranjang = [];
            tampilkanKeranjang();

            tombol.prop("disabled", false);
            tombol.html(teksAwal);

            tutupKeranjang();
            tampilkanToast("Checkout simulasi berhasil!");
        }, 1500);
    });

    tampilkanProduk();
    tampilkanKeranjang();

    console.log("GlowCare Beauty berhasil dijalankan.");
});
