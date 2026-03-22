from django.contrib import admin
from .models import FoodItem, CartItem, Order

@admin.register(FoodItem)
class FoodAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price')
    list_filter = ('category',)
    search_fields = ('name',)


admin.site.register(CartItem)
admin.site.register(Order)
