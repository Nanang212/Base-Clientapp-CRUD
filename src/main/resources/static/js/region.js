// console.log("hallo");
$(document).ready(function () {
  $("#table-region").DataTable({
    ajax: {
      method: "GET",
      url: "/api/region",
      dataSrc: "",
    },
    columns: [
      {
        data: null,
        render: (data, row, type, meta) => {
          return meta.row + 1;
        },
      },
      { data: "name" },

      {
        data: null,
        render: (data) => {
            console.log(data);
          return `
              <div class="d-flex justify-content-center gap-3">
                <!-- Button detail modal -->
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#detail"
                  title="Detail ${data.name}"
                  onclick="findById(${data.id})"
                >
                  <ion-icon name="information-circle" size="large"></ion-icon>
                </button>
                <!-- Button update modal -->
                <button
                  type="button"
                  class="btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#update"
                  title="Update ${data.name}"
                  onclick="beforeUpdate(${data.id})"

                >
                  <ion-icon name="create" size="large"></ion-icon>
                </button>
                <!-- Button delete modal -->
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  title="Delete ${data.name}"
                  onclick="deleteRegion(${data.id})"
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

$("#create-region").click((event) => {
  event.preventDefault();

  let valueName = $("#create-name").val();
  // console.log(valueName);

  if (valueName === "" || valueName === null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out Region Name!!!",
    });
  } else {
    $.ajax({
      method: "POST",
      url: "api/region",
      dataType: "JSON",
      contentType: "application/json",
      data: JSON.stringify({
        name: valueName,
      }),
      success: (res) => {
        // console.log(res);
        $("#create").modal("hide");
        $("#table-region").DataTable().ajax.reload();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Region success created...",
          showConfirmButton: false,
          timer: 2000,
        });
        $("#create-name").val("");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
});

let findById = (id) => {
  $.ajax({
    method: "GET",
    url: "api/region/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      // console.log(res);
      $("#detail-id").val(`${res.id}`);
      $("#detail-name").val(`${res.name}`);
    },
    error: (err) => {
      console.log(err);
    },
  });
};

let beforeUpdate = (id) => {
  $.ajax({
    method: "GET",
    url: "api/region/" + id,
    dataType: "JSON",
    contentType: "application/json",
    success: (res) => {
      // console.log(res);
      $("#update-id").val(`${res.id}`);
      $("#update-name").val(`${res.name}`);
    },
    error: (err) => {
      console.log(err);
    },
  });
};

$("#update-region").click((event) => {
  event.preventDefault();

  let valueId = $("#update-id").val();
  let valueName = $("#update-name").val();
  // console.log(valueName);

  if (valueName === "" || valueName === null) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please fill out Region Name!!!",
    });
  } else {
    $.ajax({
      method: "PUT",
      url: "api/region/" + valueId,
      dataType: "JSON",
      contentType: "application/json",
      data: JSON.stringify({
        name: valueName,
      }),
      success: (res) => {
        // console.log(res);
        $("#update").modal("hide");
        $("#table-region").DataTable().ajax.reload();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Region success updated...",
          showConfirmButton: false,
          timer: 2000,
        });
        $("#update-name").val("");
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
});

let deleteRegion = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          method: "DELETE",
          url: "api/region/" + id,
          dataType: "JSON",
          contentType: "application/json",
          success: (res) => {
            // console.log(res);
            swalWithBootstrapButtons.fire(
              "Deleted!",
              "Your data has been deleted.",
              "success"
            );
            $("#table-region").DataTable().ajax.reload();
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelled",
          "Your imaginary data is safe :)",
          "error"
        );
      }
    });
};