# IT ACADEMY - React #
# SPRINT 3. Javascript I
#
# e-Commerce - SHOP
#
# N1.E1 implementación de la opción Añadir al carrito
#
# N1.E2 implementación de la opción Vaciar el carrito
#
# N1.E3 calculo del total de los elementos en el carrito
#   Calculamos el total cada vez que se añade un producto al carrito
#   Mostramos el total por consola
#   Utilizamos la variable global total
#   Utilizamos una variable local en la función calculateTotal
#   Reseteamos la variable global total a cero cuando vaciamos el carrito
#
# N1.E4 implementación de la función que consolida el carro
#   agrupa los items que son iguales
#   crear un botón para llamar a la función
#
# N1.E5 implementación de las promociones
#   en lugar de hardcodear para el aceite y pastel sólo, utilizamos la funcion hasOwnPropierty("offer") del objeto para saber si el producto tiene descuentos
#   si tiene descuento lo aplicamos para calcular el subtotalWithDiscount 
#   llamamos a la función que aplica las promociones al final de la función que consolida el carro
#
# N1.E6 implementación de las promociones
#   llamamos a la función que consolida el carro al inicio de la función printCart
#   accedemos a la tabla cart_list
#   borramos las filas que existan para rellenar con el nuevo carro
#   al llamar a la función cleanCart tambien borramos las filas que existan en la tabla
#   quitamos el botón para consolidar el carro porque llamamos a esa función al mostrar el carrito.
#
# N1.E7 validación del formulario
#   validamos cada una de los requisitos con una función específica
#   añadimos la clase is-invalid a un elemento cuando hay un error
#   eliminamos la clase is-invalid de un elemento cuando no hay error
#
# N2.E9 eliminación de un producto
#   añadimos un botón como columna de la lista, (si hay más de uno ponemos un - si solo hay uno ponemos un delete)
#   recalculamos el cart, los descuentos, la lista del carrito y los totales cada vez que se elimina un producto o una unidad de un producto
#


