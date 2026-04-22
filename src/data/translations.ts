export type TranslationKey = 
  | 'where_eating'
  | 'eat_in'
  | 'take_out'
  | 'back'
  | 'my_order'
  | 'total'
  | 'confirm_item'
  | 'add_extras'
  | 'remove_ingredients'
  | 'special_requests'
  | 'tap_to_add_notes'
  | 'summary'
  | 'subtotal'
  | 'tax'
  | 'pay_now'
  | 'keep_ordering'
  | 'order_confirmed'
  | 'ticket_number'
  | 'pickup_msg'
  | 'finish'
  | 'return_to_welcome'
  | 'empty_bag'
  | 'add_something'
  | 'browse_menu'
  | 'category'
  | 'menu'
  | 'catalog'
  | 'options_available'
  | 'select_customize'
  | 'next'
  | 'add_to_cart'
  | 'add_more_items'
  | 'checkout'
  | 'quantity'
  | 'ingredients'
  | 'includes'
  | 'selected'
  | 'item_total'
  | 'confirm'
  | 'grand_total'
  | 'removed'
  | 'extras'
  | 'qty'
  | 'notes'
  | 'remove';

export const TRANSLATIONS: Record<'en' | 'es', Record<TranslationKey, string>> = {
  en: {
    where_eating: 'Where will you be eating today',
    eat_in: 'Eat In',
    take_out: 'Take Out',
    back: 'Back',
    my_order: 'My Order',
    total: 'Total',
    confirm_item: 'Confirm Item',
    add_extras: 'Add Extras',
    remove_ingredients: 'Remove Ingredients?',
    special_requests: 'Special Requests',
    tap_to_add_notes: 'Tap to add notes',
    summary: 'Order Summary',
    subtotal: 'Subtotal',
    tax: 'Tax (8%)',
    pay_now: 'Pay Now',
    keep_ordering: 'Keep Ordering',
    order_confirmed: 'Order Confirmed',
    ticket_number: 'Kitchen Ticket',
    pickup_msg: 'Take a photo or remember this number for pickup.',
    finish: 'Finish',
    return_to_welcome: 'Return To Welcome',
    empty_bag: 'Your Bag is Empty',
    add_something: 'Add something delicious to start your order',
    browse_menu: 'Browse Menu',
    category: 'Category',
    menu: 'Menu',
    catalog: 'Catalog',
    options_available: 'Options Available',
    select_customize: 'Select & Customize',
    next: 'Next',
    add_to_cart: 'Add to Cart',
    add_more_items: 'Add More Items',
    checkout: 'Checkout',
    quantity: 'Quantity',
    ingredients: 'Ingredients',
    includes: 'Includes',
    selected: 'Selected',
    item_total: 'Item Total',
    confirm: 'Confirm',
    grand_total: 'Grand Total',
    removed: 'Removed',
    extras: 'Extras',
    qty: 'Qty',
    notes: 'Notes',
    remove: 'Remove'
  },
  es: {
    where_eating: '¿Dónde comerá hoy?',
    eat_in: 'Comer Aquí',
    take_out: 'Para Llevar',
    back: 'Atrás',
    my_order: 'Mi Pedido',
    total: 'Total',
    confirm_item: 'Confirmar Item',
    add_extras: 'Agregar Extras',
    remove_ingredients: '¿Quitar Ingredientes?',
    special_requests: 'Pedidos Especiales',
    tap_to_add_notes: 'Toca para agregar notas',
    summary: 'Resumen del Pedido',
    subtotal: 'Subtotal',
    tax: 'Impuesto (8%)',
    pay_now: 'Pagar Ahora',
    keep_ordering: 'Seguir Pidiendo',
    order_confirmed: 'Pedido Confirmado',
    ticket_number: 'Ticket de Cocina',
    pickup_msg: 'Tome una foto o recuerde este número para retirar.',
    finish: 'Finalizar',
    return_to_welcome: 'Volver al Inicio',
    empty_bag: 'Tu bolsa está vacía',
    add_something: 'Agrega algo delicioso para comenzar tu pedido',
    browse_menu: 'Ver Menú',
    category: 'Categoría',
    menu: 'Menú',
    catalog: 'Catálogo',
    options_available: 'Opciones Disponibles',
    select_customize: 'Seleccionar y Personalizar',
    next: 'Siguiente',
    add_to_cart: 'Añadir al Carrito',
    add_more_items: 'Añadir más',
    checkout: 'Pagar',
    quantity: 'Cantidad',
    ingredients: 'Ingredientes',
    includes: 'Incluye',
    selected: 'Seleccionado',
    item_total: 'Total del Item',
    confirm: 'Confirmar',
    grand_total: 'Total General',
    removed: 'Eliminado',
    extras: 'Extras',
    qty: 'Cant',
    notes: 'Notas',
    remove: 'Eliminar'
  }
};
