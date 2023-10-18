let productos = [];
const url = "api/productos.json";
var total = 0;
function mostrarToast() {
  var miToast = document.getElementById("miToast");
  var cartel = new bootstrap.Toast(miToast);
  cartel.show();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarToast();
});

// similar a  función getJSONData.
let obtener = (url) => {
  var resultado = {};
  return fetch(url)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else {
        throw Error(respuesta.statusText);
      }
    })
    .then((respuesta) => {
      resultado.status = "ok";
      resultado.data = respuesta;

      return resultado;
    })
    .catch((error) => {
      resultado.status = "error";
      resultado.data = error;

      return resultado;
    });
};

function eliminar(Id) {
  let fila = document.getElementById(Id);
  if (fila) {
    const productoSeleccionado = productos.find((p) => p.id === Id);
    total -= productoSeleccionado.precio;
    const tdTotal = document.getElementById("total")
    tdTotal.innerHTML = `$${Math.round(total)}`;
    fila.parentNode.removeChild(fila);
  }

}

document.addEventListener("DOMContentLoaded", () => {
  obtener(url).then((resultado) => {
    //Agrego los productos a la lista
    if (resultado.status === "ok") {
      productos = resultado.data;
      //cargarProductos(productos); funcion que carga productos en la lista disponible
      console.log(productos);
    }
    const select = document.getElementById("productos");
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      select.innerHTML += `
        <option>${producto.producto} - $${producto.precio}</option>
      `;
    }
    const btAgregar = document.getElementById("btAgregar");
    btAgregar.addEventListener("click", () => {
      const option = select.value;
      const tabla = document.getElementById("tabla");
      const productoSeleccionado = productos.find((p) => option.includes(p.producto) && option.includes("$" + p.precio));
      tabla.innerHTML += `
          <tr id="${productoSeleccionado.id}">
                <td>${productoSeleccionado.producto}</td>
                <td class="precio">$${productoSeleccionado.precio}</td>
                <td id="${productoSeleccionado.id}"><button onclick="eliminar(${productoSeleccionado.id})" >X</button></td>
            </tr>
          `;
      total += productoSeleccionado.precio;
      const tdTotal = document.getElementById("total")
      tdTotal.innerHTML = `$${Math.round(total)}`;
    })
  });
});
