import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function CheckOut() {

  const [productos, setProductos] = useState([])
  const [varibaleSuma, setVariableSuma] = useState(0)

  function suma(prod) {
    let val = 0;
    prod.map((el) => {
      val += el.price;
    })
    return val;
  }

  useEffect(() => {
    const datos = (localStorage.getItem("carrito"));
    if (datos) {
      const parsedData = JSON.parse(datos);
      setProductos(parsedData)
      const v = suma(parsedData)
      setVariableSuma(v);
    }
  }, [])


  const handleRemoveItem = (productId) => {

    Swal.fire({
      title: 'Estas seguro de eliminar',
      text: "Quieres eliminar este producto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedItems = productos.filter((item) => item.id !== productId);
        setProductos(updatedItems)
        const v = suma(updatedItems)
        setVariableSuma(v);
        Swal.fire(
          'Eliminado!',
          'El producto a sido eliminado.',
          'success'
        )
      }
    })
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "brown" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
          </IconButton>
          <Typography variant="h6">
            Productos del carrito
          </Typography>
        </Toolbar>
      </AppBar>

      <div>
        <table className="table" style={{
          "width": "100%",
          "text-align": "center"
        }}>
          <thead style={{
            backgroundColor: "coral"
          }}>
            <tr>
              <th scope="col">Codigo</th>
              <th scope="col">Nombre</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {
              productos.map((el) => (
                <tr>
                  <th >{el.id}</th>
                  <td>{el.title}</td>
                  <td>{el.cantidad}</td>
                  <td>{el.price}</td>

                  <td><button className="btn" style={{ "background-color": "brown", "color": "white" }} onClick={() => { handleRemoveItem(el.id) }}>eliminar</button></td>
                </tr>
              ))
            }

          </tbody>
        </table>

      </div >



      <div>
        <p className="h4" style={{ "text-align": "center" }}>Total a pagar: {varibaleSuma}</p>
      </div>


      <Link className="btn btn-outline-success" href="/" style={{ "margin-left": "47%", "background-color": "brown", "color": "white" }} onClick={() => {
        localStorage.clear(); 
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Compra Exitosa',
          showConfirmButton: false,
          timer: 1500
        })
      }}>Comprar</Link>
    </>
  )
}