$(document).ready(function () {
  $("#table-country").DataTable({
    ajax: {
      method: "GET",
      url: "api/country",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: (data, type, row, meta) => {
          return meta.row + 1;
        },
      },
      { data: "countryCode" }, // Menggunakan properti countryCode dari respons
      { data: "countryName" }, // Menggunakan properti countryName dari respons
      { data: "regionName" }, // Menggunakan properti regionName dari respons
      {
        data: null,

        render: (data) => {
          return `
                <div class="d-flex justify-content-center gap-3">
                  <!-- Button detail modal -->
                  <button
                    type="button"
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#detail"
                    title="Detail ${data.countryName}"
                    onclick="openDetailModal('${data.countryId}', '${data.countryName}', '${data.countryCode}', '${data.regionName}')">
                    <ion-icon name="information-circle" size="large"></ion-icon>
                  </button>
                  <!-- Button update modal -->
                  <button
                  type="button"
                  class="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#updateCountryModal"
                  data-id="${data.countryId}"
                  data-code="${data.countryCode}"
                  data-name="${data.countryName}"
                  data-region-id="${data.regionId}"
                  data-region-name="${data.regionName}"
                  onclick="prepareUpdate(this)"
                  title="Update ${data.countryName}"
                >
                <ion-icon name="create" size="large"></ion-icon>
                <button
                type="button"
                class="btn btn-danger btn-sm"
                title="Delete ${data.countryName}"
                onclick="confirmDelete('${data.countryId}', '${data.countryName}', '${data.countryCode}', '${data.regionName}')"
              >
                <ion-icon name="trash" size="large"></ion-icon>
              </button>
                </div>
              `;
        },
      },
    ],
  });
});

// DETAIL COUNTRY
function openDetailModal(countryId, countryName, countryCode, regionName) {
  // Populate modal content with data
  $("#countryId").text(countryId);
  $("#countryName").text(countryName);
  $("#countryCode").text(countryCode);
  $("#countryRegion").text(regionName);

  // Show the modal
  $("#detailCountry").modal("show");
}

//Create Country
$(document).ready(function () {
  // Memuat daftar region saat dokumen siap
  $.ajax({
    method: "GET",
    url: "api/region",
    dataType: "json",
    success: function (data) {
      let regionSelect = $("#selectRegion");

      $.each(data, function (index, region) {
        regionSelect.append(
          $("<option></option>").attr("value", region.id).text(region.name)
        );
      });
    },
    error: function (err) {
      console.log(err);
    },
  });

  // Menangani klik tombol "Save" pada modal Create
  $("#create-country").click(function () {
    let selectRegion = $("#selectRegion");
    let countryCode = $("#create-code").val();
    let countryName = $("#create-name").val();
    let selectedRegionId = selectRegion.val();

    let newData = {
      code: countryCode,
      name: countryName,
      regionId: selectedRegionId,
    };

    $.ajax({
      method: "POST",
      url: "api/country",
      contentType: "application/json",
      data: JSON.stringify(newData),
      success: function (data) {
        $("#create").modal("hide");
        $("#table-country").DataTable().ajax.reload();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Country successfully created",
          showConfirmButton: false,
          timer: 2000,
        });
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});

//update country
function prepareUpdate(button) {
  let id = button.getAttribute("data-id");
  let code = button.getAttribute("data-code");
  let name = button.getAttribute("data-name");
  let regionId = button.getAttribute("data-region-id");

  $.ajax({
    method: "GET",
    url: "api/region", // Ganti dengan URL yang sesuai
    dataType: "json",
    success: function (data) {
      let updateRegionSelect = $("#updateRegionSelection");

      updateRegionSelect.empty();

      $.each(data, function (index, region) {
        updateRegionSelect.append(
          $("<option></option>").attr("value", region.id).text(region.name)
        );
      });

      let selectedRegionId = $("#updateRegionSelection").data(
        "selected-region-id"
      );
      if (selectedRegionId) {
        $("#updateRegionSelection").val(selectedRegionId);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });

  // Isi data pada modal "Update Country"
  $("#updateCountryCodeInput").val(code);
  $("#updateCountryNameInput").val(name);
  $("#updateRegionSelection").val(regionId);

  // Tambahkan event listener untuk tombol "Update"
  $("#updateCountryButton")
    .off("click")
    .on("click", function () {
      // Ambil data yang diubah dari modal "Update Country"
      let countryCode = $("#updateCountryCodeInput").val();
      let countryName = $("#updateCountryNameInput").val();
      let selectedRegionId = $("#updateRegionSelection").val();

      // Buat objek data untuk pembaruan
      let updatedData = {
        code: countryCode,
        name: countryName,
        region: {
          id: selectedRegionId,
        },
      };

      $.ajax({
        method: "PUT",
        url: "api/country/" + id, // Ganti dengan URL yang sesuai
        contentType: "application/json",
        data: JSON.stringify(updatedData),
        success: function (data) {
          $("#updateCountryModal").modal("hide");
          $("#table-country").DataTable().ajax.reload();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Country successfully update",
            showConfirmButton: false,
            timer: 2000,
          });
        },
        error: function (err) {
          console.log(err);
          showToast("error", "Terjadi kesalahan saat memperbarui data.");
        },
      });
    });
}

//delete country
function confirmDelete(countryId, countryName, countryCode, regionName) {
    Swal.fire({
      title: "Are you sure want to delete?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          type: "DELETE",
          url: `api/country/${countryId}`,
          success: function (res) {
            const table = $("#table-country").DataTable();
            table
              .row($(`tr[data-id="${countryId}"]`))
              .remove()
              .draw(false);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Country successfully delete",
              showConfirmButton: false,
              timer: 2000,
            });
            $("#table-country").DataTable().ajax.reload();
          },
          error: function (err) {
            showToast("error", `An error occurred: ${err.responseJSON.message}`);
          },
        });
      }
    });
  }
