from django.urls import path
from .views import (
    food_items,
    add_cart,
    cart,
    create_order,
    clear_cart,
    remove_from_cart   # 👈 THIS WAS MISSING
)


urlpatterns = [
    path('food-items/', food_items),
    path('cart/add/', add_cart),
    path('cart/', cart),
    path('order/create/', create_order),
    path('cart/clear/', clear_cart),
    path('cart/remove/', remove_from_cart),


]
